#!/usr/bin/env node

var child_process = require("child_process");

function axec(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

function exec(cmd) {
  return child_process.execSync(cmd,{shell:"/bin/bash"}).toString();
};

function pad(len, pad, str) {
  str = String(str);
  while (str.length < len) {
    str = pad + str;
  }
  return str.slice(0, len);
};

function get_date() {
  var date = new Date();
  var day = pad(2, "0", date.getDay());
  var month = pad(2, "0", date.getMonth());
  var year = pad(4, "0", 1900 + date.getYear());
  var hour = pad(2, "0", date.getHours());
  var minute = pad(2, "0", date.getMinutes());
  var second = pad(2, "0", date.getSeconds());
  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
};

function get_battery() {
  var txt = exec("acpi --battery");
  txt = txt.slice(txt.indexOf(":")+2, -1);
  txt = txt.replace("Discharging, ", "");
  txt = txt.replace("Charging, ", "+");
  txt = txt.replace(" remaining", "");
  txt = txt.slice(0,-3);
  txt = txt.replace(", ", " ");
  txt = txt + "h left";
  return txt;
};

function get_volume() {
  var got = exec(`amixer sget Master`);
  var vol = got.slice(got.indexOf("[")+1, got.indexOf("]"));
  var mut = got.indexOf("[on]") === -1;
  return (mut ? "no" : vol) + " vol";
};

function get_window() {
  return exec(`
    len=$(echo -n "$(xdotool getwindowfocus getwindowname)" | wc -m)
    max_len=70
    if [ "$len" -gt "$max_len" ];then
      echo -n "$(xdotool getwindowfocus getwindowname | cut -c 1-$max_len)..."
    else
      echo -n "$(xdotool getwindowfocus getwindowname)"
    fi
  `);
};

var date = null;
var battery = null;
var volume = null;
var window = null;

function refresh() {
  date = get_date();
  battery = get_battery();
  volume = get_volume();
  window = get_window();
  console.log(`Victor Maia%{c}${window}%{r}${volume} | ${battery} | ${date}`);
};

setInterval(() => {
  refresh();
}, 250);
