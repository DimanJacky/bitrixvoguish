;(function()
{
	if(BX.SimpleVAD)
	{
		return;
	}

	var VOLUME_THRESHOLD = 0.1;
	var INACTIVITY_TIME = 2000;

	/**
	 * Naive voice activity detection
	 * @param {object} config
	 * @param {MediaStream} config.mediaStream
	 * @param {function} config.onVoiceStarted
	 * @param {function} config.onVoiceStopped
	 * @constructor
	 */
	BX.SimpleVAD = function(config)
	{
		this.mediaStream = config.mediaStream;
		this.audioContext = null;
		this.mediaStreamNode = null;
		this.analyserNode = null;

		this.audioTimeDomainData = null;
		this.voiceState = false;

		this.measureInterval = 0;
		this.inactivityTimeout = 0;

		this.callbacks = {
			voiceStarted: BX.type.isFunction(config.onVoiceStarted) ? config.onVoiceStarted : BX.DoNothing,
			voiceStopped: BX.type.isFunction(config.onVoiceStopped) ? config.onVoiceStopped : BX.DoNothing
		};

		if(BX.SimpleVAD.isSupported())
		{
			this.init();
		}
	};

	BX.SimpleVAD.isSupported = function()
	{
		return (window.AudioContext || window.webkitAudioContext) && window.AnalyserNode && typeof(window.AnalyserNode.prototype['getFloatTimeDomainData']) === "function";
	};

	BX.SimpleVAD.prototype.init = function()
	{
		if(!(this.mediaStream instanceof MediaStream))
		{
			return false;
		}

		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.analyserNode = this.audioContext.createAnalyser();
		this.analyserNode.fftSize = 128;
		this.mediaStreamNode = this.audioContext.createMediaStreamSource(this.mediaStream);
		this.mediaStreamNode.connect(this.analyserNode);

		this.audioTimeDomainData = new Float32Array(this.analyserNode.fftSize);
		this.measureInterval = setInterval(this.analyzeAudioStream.bind(this), 100);
	};

	BX.SimpleVAD.prototype.analyzeAudioStream = function()
	{
		this.analyserNode.getFloatTimeDomainData(this.audioTimeDomainData);
		var volume = this.getAverageVolume(this.audioTimeDomainData);

		this.setVoiceState(volume >= VOLUME_THRESHOLD);
	};

	BX.SimpleVAD.prototype.setVoiceState = function(voiceState)
	{
		if(this.voiceState == voiceState)
		{
			return;
		}

		if(voiceState)
		{
			this.callbacks.voiceStarted();
			clearTimeout(this.inactivityTimeout);
			this.inactivityTimeout = 0;
			this.voiceState = true;
		}
		else
		{
			if(!this.inactivityTimeout)
			{
				this.inactivityTimeout = setTimeout(this.onInactivityTimeout.bind(this), INACTIVITY_TIME);
			}
		}
	};

	BX.SimpleVAD.prototype.onInactivityTimeout = function()
	{
		this.inactivityTimeout = 0;
		this.voiceState = false;
		this.callbacks.voiceStopped();
	};

	BX.SimpleVAD.prototype.getAverageVolume = function(audioTimeDomainData)
	{
		var sum = 0;

		for(var i = 0; i < audioTimeDomainData.length; i++)
		{
			sum += audioTimeDomainData[i] * audioTimeDomainData[i];
		}

		return Math.sqrt(sum / audioTimeDomainData.length);
	};

	BX.SimpleVAD.prototype.destroy = function()
	{
		if(this.analyserNode)
		{
			this.analyserNode.disconnect();
		}

		if(this.mediaStreamNode)
		{
			this.mediaStreamNode.disconnect();
		}

		if(this.audioContext)
		{
			this.audioContext.close();
		}

		clearInterval(this.measureInterval);

		this.analyserNode = null;
		this.mediaStreamNode = null;
		this.mediaStream = null;
		this.audioContext = null;

		this.callbacks = {
			voiceStarted: BX.DoNothing,
			voiceStopped: BX.DoNothing
		}
	}
})();

