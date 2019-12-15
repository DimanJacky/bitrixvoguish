<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<!--
https://w3layouts.com/voguish-a-blogging-category-flat-bootstrap-responsive-web-template/
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>
<head>
    <?php
    use Bitrix\Main\Page\Asset;
    $APPLICATION->ShowHead();
    ?>
    <title><?php $APPLICATION->ShowTitle(); ?></title>

    <?php
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . "/css/bootstrap.css");
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . "/css/style.css");

    CJSCore::Init(['jquery']);
    Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . "/js/responsiveslides.min.js");

    Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1">');
    Asset::getInstance()->addString("<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900' rel='stylesheet' type='text/css'>");
    Asset::getInstance()->addString("<link href='http://fonts.googleapis.com/css?family=Libre+Baskerville:400,700' rel='stylesheet' type='text/css'>");
    Asset::getInstance()->addString('<link type="image/x-icon" href="' . SITE_TEMPLATE_PATH . '/favicon.ico" rel="shortcut icon" />');
    ?>



    <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

    <script>
        $(function () {
            $("#slider").responsiveSlides({
                auto: true,
                nav: true,
                speed: 500,
                namespace: "callbacks",
                pager: true,
            });
        });

    </script>

</head>
<body>
<div id="panel"><?php $APPLICATION->ShowPanel(); ?></div>
<!-- header -->
<div class="header">
    <div class="container">
        <div class="logo">
            <a href="index.html"><img src="<?=SITE_TEMPLATE_PATH;?>/images/logo.png" class="img-responsive" alt=""></a>
        </div>

        <div class="head-nav">
            <span class="menu"> </span>
            <ul class="cl-effect-1">
                <li class="active"><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="404.html">Shortcodes</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="contact.html">Contact</a></li>
                <div class="clearfix"></div>
            </ul>
        </div>
        <!-- script-for-nav -->
        <script>
            $( "span.menu" ).click(function() {
                $( ".head-nav ul" ).slideToggle(300, function() {
                    // Animation complete.
                });
            });
        </script>
        <!-- script-for-nav -->



        <div class="clearfix"> </div>
    </div>
</div>
<!-- header -->
<div class="container">
    <div class="col-md-9 bann-right">