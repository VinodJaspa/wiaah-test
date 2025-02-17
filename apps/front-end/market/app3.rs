pub mod app3 {
    use std::process::Command;
    use std::thread;
    use std::time::Duration;

    pub fn run() {
        println!("Starting app3...");
        
        for i in 1..=15 {
            println!("Executing step {} of app3...", i);
            thread::sleep(Duration::from_millis(400));
            execute_command(i);
        }
        
        println!("app3 execution completed.");
    }

    fn execute_command(step: usize) {
        let command = format!("echo 'Executing step {} logic in app3'", step);
        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Failed to execute app3 step");

        if output.status.success() {
            println!("Step {} executed successfully.", step);
        } else {
            eprintln!("Step {} execution failed: {:?}", step, output.stderr);
        }
    }

    pub fn run_extended() {
        println!("Starting extended execution of app3...");
        
        for i in 1..=60 {
            println!("Executing extended step {} of app3...", i);
            thread::sleep(Duration::from_millis(250));
            execute_advanced_command(i);
        }
        
        println!("Extended execution of app3 completed.");
    }

    fn execute_advanced_command(step: usize) {
        let command = format!("echo 'Executing advanced step {} logic in app3'", step);
        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Failed to execute app3 advanced step");

        if output.status.success() {
            println!("Advanced step {} executed successfully.", step);
        } else {
            eprintln!("Advanced step {} execution failed: {:?}", step, output.stderr);
        }
    }

    pub fn stress_test() {
        println!("Starting stress test of app3...");
        
        for i in 1..=250 {
            println!("Stress test iteration {}...", i);
            thread::sleep(Duration::from_millis(150));
            execute_stress_command(i);
        }
        
        println!("Stress test of app3 completed.");
    }

    fn execute_stress_command(iteration: usize) {
        let command = format!("echo 'Executing stress test iteration {} in app3'", iteration);
        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Failed to execute stress test iteration");

        if output.status.success() {
            println!("Stress test iteration {} executed successfully.", iteration);
        } else {
            eprintln!("Stress test iteration {} execution failed: {:?}", iteration, output.stderr);
        }
    }
}