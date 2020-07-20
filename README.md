## Keyboard:

- sudo mv us /usr/share/X11/xkb/symbols

- For Gnome:

  - setxkbmap -option "lv3:caps_switch"

  - setxkbmap -option "ctrl:swap_lalt_lctl"

  ... ou ...

  - gsettings set org.gnome.desktop.input-sources xkb-options "['ctrl:swap_lalt_lctl', 'lv3:capslock']"

- For BSPWM:
  
  - Added `~/.Xmodmap`

## Browser

- Install Brave

- Install the Vimium extension

- Copy .vimiumrc to Custom key mappings

- To remap <c-h> and <c-l> to PrevTab and NextTab, we must compile the Shortkeys extension. Check: https://askubuntu.com/questions/1259974/is-it-possible-to-remap-prevtab-and-nexttab-to-c-h-and-c-l-on-chrome-brave/1259983#1259983

## BSPWM

- Added `/etc/X11/xorg.conf.d/90-touchpad.conf` to make natural scrolling
  possible (https://cravencode.com/post/essentials/enable-tap-to-click-in-i3wm/)

- Added `~/.Xresources` for DPI scaling (200%)  

- Added `~/.config/bspwm/bspwmrc` and `~/.config/sxhkd/sxhkdrc`

## Font stuff

- The `fontsel` command allows me to pick a font that can then be passed to
  Lemonbar with the `lemonbar -f FONT_NAME` command.

## Readlist

- https://dotfiles.github.io/tutorials/

- http://eirenicon.org/knowledge-base/building-a-bspwm-desktop-a-guide/
