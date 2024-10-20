<?php
/**
 * Plugin Name: Advance Custom HTML
 * Description: An advance html code editor which enable you to code professionally. It provides different skins, denting, correction and more. 
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: custom-html
 */

if (!defined('ABSPATH')) {
	exit;
}

// Constant
define('ACHB_VER', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('ACHB_DIR', plugin_dir_url(__FILE__) . 'assets/');

class ACHB_Main
{
	function __construct()
	{
		add_action('init', [$this, 'init']);
	}

	function init()
	{

		register_block_type(__DIR__ . '/build', [
			'render_callback' => function ($attrs) {
				extract($attrs);
				return $HTML;
			}
		]);

		wp_set_script_translations('achb-editor', 'custom-html', plugin_dir_path(__FILE__) . 'languages');
	}

	function render($attributes)
	{
		extract($attributes);
		return $HTML;
	}
}
new ACHB_Main;