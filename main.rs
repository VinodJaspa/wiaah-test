use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*;
use std::process::Command;

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    apps: Apps,
    pipeline: String,
    cmd: Vec<String>,
    proctor: String,
    locals: Locals,
}

#[derive(Debug, Serialize, Deserialize)]
struct Apps {
    app1: String,
    app2: String,
    app3: String,
    app4: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Locals {
    protocol: String,
    mac: String,
    kernel_version: String,
    os: String,
    core_throttles: String,
    heat_level: String,
    var_mvar: String,
    critical_ovt: String,
    critical_sys_rt: String,
}

fn main() {
    let mut file = File::open("config.yml").expect("Unable to open config file");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Unable to read config file");

    let config: Config = serde_yaml::from_str(&contents).expect("Unable to parse YAML");

    println!("{:#?}", config);

    execute_pipeline(&config.pipeline);

    apply_kernel_optimizations(&config.locals);
}

fn execute_pipeline(pipeline: &str) {
    let apps: Vec<&str> = pipeline.split('+').collect();
    for app in apps {
        match app {
            "app1" => app1::run(),
            "app2" => app2::run(),
            "app3" => app3::run(),
            "app4" => app4::run(),
            _ => println!("Unknown app: {}", app),
        }
    }
}

fn apply_kernel_optimizations(locals: &Locals) {
    println!("Applying kernel optimizations...");

    if locals.core_throttles == "disabled" {
        disable_core_throttling();
    }

    set_network_protocol(&locals.protocol);

    adjust_heat_level(&locals.heat_level);

    set_critical_thresholds(locals.critical_ovt, locals.critical_sys_rt);

    set_memory_allocation(locals.var_mvar.parse().unwrap_or(1000));
}

fn disable_core_throttling() {
    println!("Disabling CPU core throttling...");
    let output = Command::new("bash")
        .arg("-c")
        .arg("echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor")
        .output()
        .expect("Failed to disable core throttling");

    if output.status.success() {
        println!("CPU core throttling disabled.");
    } else {
        eprintln!("Failed to disable CPU core throttling: {:?}", output.stderr);
    }
}

fn set_network_protocol(protocol: &str) {
    println!("Setting network protocol to {}...", protocol);
    if protocol == "TCP/IP" {
        let output = Command::new("sysctl")
            .arg("-w")
            .arg("net.ipv4.tcp_window_scaling=1")
            .output()
            .expect("Failed to set TCP window scaling");

        if output.status.success() {
            println!("TCP window scaling enabled.");
        } else {
            eprintln!("Failed to set TCP window scaling: {:?}", output.stderr);
        }
    }
}

fn adjust_heat_level(heat_level: &str) {
    println!("Adjusting heat level to {}...", heat_level);
    if heat_level == "high" {
        let output = Command::new("cpufreq-set")
            .arg("-g")
            .arg("performance")
            .output()
            .expect("Failed to set CPU governor");

        if output.status.success() {
            println!("CPU governor set to performance mode.");
        } else {
            eprintln!("Failed to set CPU governor: {:?}", output.stderr);
        }
    }
}

fn set_critical_thresholds(ovt: &str, sys_rt: &str) {
    println!("Setting critical thresholds: OVT = {}, SYS_RT = {}...", ovt, sys_rt);
    let output = Command::new("sysctl")
        .arg("-w")
        .arg(format!("kernel.ovt_threshold={}", ovt))
        .output()
        .expect("Failed to set OVT threshold");

    if output.status.success() {
        println!("OVT threshold set to {}.", ovt);
    } else {
        eprintln!("Failed to set OVT threshold: {:?}", output.stderr);
    }

    let output = Command::new("sysctl")
        .arg("-w")
        .arg(format!("kernel.sys_rt_threshold={}", sys_rt))
        .output()
        .expect("Failed to set SYS_RT threshold");

    if output.status.success() {
        println!("SYS_RT threshold set to {}.", sys_rt);
    } else {
        eprintln!("Failed to set SYS_RT threshold: {:?}", output.stderr);
    }
}

fn set_memory_allocation(memory_mb: u32) {
    println!("Setting memory allocation to {} MB...", memory_mb);
    let output = Command::new("sysctl")
        .arg("-w")
        .arg(format!("vm.dirty_bytes={}", memory_mb * 1024 * 1024))
        .output()
        .expect("Failed to set memory allocation");

    if output.status.success() {
        println!("Memory allocation set to {} MB.", memory_mb);
    } else {
        eprintln!("Failed to set memory allocation: {:?}", output.stderr);
    }
}