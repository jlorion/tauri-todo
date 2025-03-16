#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

pub fn run() {
    let migrations = vec![   
        Migration {  
            version: 1,  
            description: "make email unique",  
            sql: "CREATE TABLE IF NOT EXISTS users (  
                id INTEGER PRIMARY KEY AUTOINCREMENT,  
                name TEXT NOT NULL,  
                email TEXT,
                password TEXT,
                UNIQUE(email)
            ); 
            CREATE TABLE IF NOT EXISTS todo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                body TEXT NOT NULL,  
                start_date TEXT NOT NULL,  
                end_date TEXT NOT NULL,  
                is_done INTEGER NOT NULL,
                user_id INTEGER ,
                FOREIGN KEY(user_id) REFERENCES users(id) 
            );",  
            kind: MigrationKind::Up,  
        }
    ];  
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:database.db", migrations).build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
