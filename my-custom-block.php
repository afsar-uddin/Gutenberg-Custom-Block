<?php
/**
 * Plugin Name: My Custom Block
 * Description: A custom Gutenberg block.
 * Version: 1.0.0
 * Author: Afsar Uddin
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function my_custom_block_register_block() {
    // Register block editor script
    wp_register_script(
        'my-custom-block-editor-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' )
    );

    // Register block
    register_block_type( 'my-custom/block', array(
        'editor_script' => 'my-custom-block-editor-script',
    ) );

    register_block_type( 'my-custom/card', array(
        'editor_script' => 'my-custom-block-editor-script',
    ) );


    register_block_type( 'my-custom/accordion', array(
        'editor_script' => 'my-custom-block-editor-script',
    ) );
}
add_action( 'init', 'my_custom_block_register_block' );

function my_accordion_block_enqueue_assets() {
    wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', array(), '5.3.0');
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);

    wp_enqueue_style(
        'my-accordion-block-editor-style',
        plugins_url('assets/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/editor.css')
    );

    wp_enqueue_style( 'my-accordion-block-style', plugins_url( 'assets/style.css', __FILE__ ) );
}
add_action( 'enqueue_block_assets', 'my_accordion_block_enqueue_assets' );
