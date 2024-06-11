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

    // register_block_type( 'my-custom/block', array(
    //     'editor_script' => 'my-custom-block-editor-script',
    // ) );

    // register_block_type( 'my-custom/list-items', array(
    //     'editor_script' => 'my-custom-block-editor-script',
    // ) );
}
add_action( 'init', 'my_custom_block_register_block' );
