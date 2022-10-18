<?php
/**
 * Plugin Name: Custom HTML Block
 * Description: Write code like editor like editor
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: custom-html
 */

if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'CH_VER', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.6' );
define( 'CH_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

class BCustomHTML{
	function __construct(){
		add_action( 'init', [$this, 'init'] );
	}


	function init() {
		wp_register_style( 'ch-editor', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], CH_VER );

		register_block_type( __DIR__, [
			'editor_style'		=> 'ch-editor',
			'style'				=> 'ch-editor',
			'render_callback'	=> [$this, 'render']
		] ); 

		wp_set_script_translations( 'ch-editor', 'custom-html', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );
		return $HTML;
	} 
}
new BCustomHTML;