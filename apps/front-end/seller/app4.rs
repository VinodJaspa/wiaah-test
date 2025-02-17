pub mod app4 {
    use std::process::Command;
    use std::thread;
    use std::time::Duration;

    pub fn run() {
        println!("Starting app4...");
        
        for i in 1..=20 {
            println!("Executing step {} of app4...", i);
            thread::sleep(Duration::from_millis(350));
            execute_command(i);
        }
        
        println!("app4 execution completed.");
    }

    fn execute_command(step: usize) {
        let command = format!("echo 'Executing step {} logic in app4'", step);
        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Failed to execute app4 step");

        if output.status.success() {
            println!("Step {} executed successfully.", step);
        } else {
            eprintln!("Step {} execution failed: {:?}", step, output.stderr);
        }
    }

    pub fn run_extended() {
        println!("Starting extended execution of app4...");
        
        for i in 1..=70 {
            println!("Executing extended step {} of app4...", i);
            thread::sleep(Duration::from_millis(300));
            execute_advanced_command(i);
        }
        
        println!("Extended execution of app4 completed.");
    }

    fn execute_advanced_command(step: usize) {
        let command = format!("echo 'Executing advanced step {} logic in app4'", step);
        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Failed to execute app4 advanced step");

        if output.status.success() {
            println!("Advanced step {} executed successfully.", step);
        } else {
            eprintln!("Advanced step {} execution failed: {:?}", step, output.stderr);
        }
    }

    pub fn stress_test() {
        println!("Starting stress test of app4...");
        
        for i in 1..=300 {
            println!("Stress test iteration {}...", i);
            thread::sleep(Duration::from_millis(200));
            execute_stress_command(i);
        }
        
        println!("Stress test of app4 completed.");
    }

    fn execute_stress_command(iteration: usize) {
        let command = format!("echo 'Executing stress test iteration {} in app4'", iteration);
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
