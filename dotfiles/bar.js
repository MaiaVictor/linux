#!/usr/bin/env node

var child_process = require("child_process");
var os = require("os");

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
  var ix0 = txt.indexOf(":");
  var ix1 = txt.indexOf(",", ix0) + 2;
  var ix2 = txt.indexOf("%", ix1) + 1;
  var cha = txt.indexOf("Charging") !== -1;
  var dis = txt.indexOf("Discarching") !== -1;
  var bat = txt.slice(ix1, ix2);
  var rem = txt.slice(ix2+2, ix2+10);
  return bat + " " + rem + (cha ? " full" : dis ? " left" : "");
};

//console.log(get_battery());
//process.exit();

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

//console.log(get_cpu());
//process.exit();

var date = "_";
var battery = "_";
var volume = "_";
var window = "_";
var cpu = "_";
var mem = "_";

var cpu_last_used = []; 
var cpu_last_idle = [];
function refresh_cpu() {
  var cpus = os.cpus();
  var cpu_curr_used = [];
  var cpu_curr_idle = [];
  for (var i = 0; i < cpus.length; ++i) {
    cpu_last_used[i] = cpu_last_used[i] || 0;
    cpu_last_idle[i] = cpu_last_idle[i] || 0;
    cpu_curr_used[i] = cpu_curr_used[i] || 0;
    cpu_curr_idle[i] = cpu_curr_idle[i] || 0;
  }
  for (var i = 0; i < cpus.length; ++i) {
    cpu_curr_used[i] += cpus[i].times.user;
    cpu_curr_used[i] += cpus[i].times.nice;
    cpu_curr_used[i] += cpus[i].times.sys;
    cpu_curr_used[i] += cpus[i].times.irq;
    cpu_curr_idle[i] += cpus[i].times.idle;
  }
  var txt = "";
  for (var i = 0; i < cpu_curr_used.length; ++i) {
    var used = cpu_curr_used[i] - cpu_last_used[i];
    var idle = cpu_curr_idle[i] - cpu_last_idle[i];
    txt += (i?" ":"")+pad(2, "0", Math.min(Math.floor(used / idle * 100),99));
  }
  for (var i = 0; i < cpu_curr_used.length; ++i) {
    cpu_last_used[i] = cpu_curr_used[i];
    cpu_last_idle[i] = cpu_curr_idle[i];
  }
  txt += " cpu";
  cpu = txt;
};
setInterval(refresh_cpu, 2000);

function refresh_mem() {
  var free = os.freemem();
  var total = os.totalmem();
  mem = String(Math.floor((total - free) / total * 100)) + " mem";
};
setInterval(refresh_mem, 2000);

function refresh() {
  date = get_date();
  battery = get_battery();
  volume = get_volume();
  window = get_window();
  console.log(`${cpu} | ${mem}%{c}${window}%{r}${volume} | ${battery} | ${date}`);
};
setInterval(refresh, 500);
