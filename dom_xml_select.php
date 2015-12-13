<?php
    $dom = new DOMDocument('1.0','UTF-8');
    var_dump( $dom );
    echo '<hr/>';
    //PHP读取XML文档
    $dom->load( 'bookstore.xml' );
    //找到bookstore中的title元素
    $titles = $dom->getElementsByTagName('title');
    var_dump( $titles );
    echo '<hr/>';
    //$dom DOMDocument对象 调用了getElementsByTagName方法之后 就是  $titles DOMNodeList对象
    $one = $titles->item(0);
    var_dump( $one );
    echo '<hr/>';
    //$titles DOMNodeList对象 调用了item方法之后 就是 $one DOMElement对象
    $one_content = $one->nodeValue;
    var_dump($one_content);