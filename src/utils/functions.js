import { produce } from "immer";
// Themes
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { abyss } from '@uiw/codemirror-theme-abyss';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { aura } from '@uiw/codemirror-theme-aura';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { basicLight, basicDark } from '@uiw/codemirror-theme-basic';
import { bespin } from '@uiw/codemirror-theme-bespin';
import { copilot } from '@uiw/codemirror-theme-copilot';
import { consoleLight, consoleDark } from '@uiw/codemirror-theme-console';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark';
import { material } from '@uiw/codemirror-theme-material';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';
import { kimbie } from '@uiw/codemirror-theme-kimbie';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { nord } from '@uiw/codemirror-theme-nord';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { quietlight } from '@uiw/codemirror-theme-quietlight';
import { red } from '@uiw/codemirror-theme-red';
import { solarizedLight, solarizedDark } from '@uiw/codemirror-theme-solarized';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { whiteDark } from '@uiw/codemirror-theme-white/dark';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';




export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, draft => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, draft => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(draft[currentProp], value, ...remainingProps);
  });
};

export const themeMap = {
  abcdef,
  abyss,
  androidstudio,
  andromeda,
  atomone,
  aura,
  bbedit,
  basicLight,
  basicDark,
  bespin,
  copilot,
  consoleLight,
  consoleDark,
  dracula,
  darcula,
  duotoneLight,
  duotoneDark,
  eclipse,
  githubLight,
  githubDark,
  gruvboxDark,
  material,
  monokai,
  monokaiDimmed,
  kimbie,
  noctisLilac,
  nord,
  okaidia,
  quietlight,
  red,
  solarizedLight,
  solarizedDark,
  sublime,
  tokyoNight,
  tokyoNightStorm,
  tokyoNightDay,
  tomorrowNightBlue,
  whiteDark,
  vscodeLight,
  xcodeLight,
  xcodeDark,
};
