import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import "./editor.css";
import Edit from "./edit";

registerBlockType(metadata, {
  edit: Edit,
  save: () => null,
});
