## Keyboard:

- sudo mv us /usr/share/X11/xkb/symbols

- setxkbmap -option "lv3:caps_switch"

- setxkbmap -option "ctrl:swap_lalt_lctl"

... ou ...

- gsettings set org.gnome.desktop.input-sources xkb-options "['ctrl:swap_lalt_lctl', 'lv3:capslock']"

## Browser

- Install Brave

- Install the Vimium extension

- Copy .vimiumrc to Custom key mappings

- To remap <c-h> and <c-l> to PrevTab and NextTab, we must compile the Shortkeys extension. Check: https://askubuntu.com/questions/1259974/is-it-possible-to-remap-prevtab-and-nexttab-to-c-h-and-c-l-on-chrome-brave/1259983#1259983

## Config

- ~/.config/user-dirs.dirs
