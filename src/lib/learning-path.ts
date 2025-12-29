export interface Topic {
  id: string;
  title: string;
  description: string;
  componentId?: string;
  details?: {
    definition: string;
    syntax: string;
    practical: string;
    explanation: string;
  };
}

export interface Phase {
  id: string;
  title: string;
  color: string;
  topics: Topic[];
}

export const learningPath: Phase[] = [
  {
    id: "p1",
    title: "Phase 1: First Breath",
    color: "bg-slate-500",
    topics: [
      { 
        id: "1", 
        title: "Rust Genesis", 
        description: "The core motivation behind the language.", 
        componentId: "why-rust",
        details: {
          definition: "Rust was engineered by Mozilla to bridge the gap between high-level safety and low-level control. It solves the 'Billion Dollar Mistake' by making memory safety a guarantee rather than a developer's burden.",
          syntax: "// No special syntax here, just the entry point\nfn main() {\n    println!(\"Safe and Fast\");\n}",
          practical: "// Rust prevents 'Use-After-Free' bugs\nlet data = String::from(\"Rust\");\ndrop(data);\n// println!(\"{}\", data); // The compiler would block this!",
          explanation: "In other systems languages, errors like null pointer dereferencing or data races are runtime crashes. In Rust, they are compile-time errors."
        }
      },
      { 
        id: "2", 
        title: "Cargo Mastery", 
        description: "Orchestrating your development workflow.", 
        componentId: "cargo",
        details: {
          definition: "Cargo is the standard build tool and package manager for Rust. It handles everything from dependency resolution to compiling and running your code.",
          syntax: "// Initialize a new project\ncargo new hello_cargo\n// Build and run\ncargo run",
          practical: "[dependencies]\nrand = \"0.8.5\"\n// Cargo will automatically download and link this library.",
          explanation: "By defining dependencies in 'Cargo.toml', you ensure your project is reproducible across any machine without manual setup."
        }
      },
      { 
        id: "3", 
        title: "The println! Macro", 
        description: "The gateway to interacting with the console.",
        componentId: "println-macro",
        details: {
          definition: "The println! macro is Rust's primary output tool. Unlike regular functions, macros can take a variable number of arguments and perform compile-time checks on the format string.",
          syntax: "println!(\"Number: {}\", 42);",
          practical: "let name = \"Alice\";\nprintln!(\"Hello, {}! Welcome to Rust.\", name);",
          explanation: "The '!' indicates a macro. Rust ensures that you have provided the correct number of variables for every pair of braces '{}' in your string."
        }
      },
      { 
        id: "4", 
        title: "Immutable by Default", 
        description: "The fundamental safety of fixed values.", 
        componentId: "syntax-basics",
        details: {
          definition: "Rust variables are immutable by default, meaning their values cannot be changed after binding. This prevents accidental data modification and improves thread safety.",
          syntax: "let x = 5;\n// x = 6; // Error!",
          practical: "let mut x = 5;\nx = 6; // Success with 'mut'",
          explanation: "By defaulting to immutability, Rust encourages you to think about which data truly needs to change, reducing complex state management bugs."
        }
      },
      { 
        id: "5", 
        title: "Variable Shadowing", 
        description: "Reusing names for cleaner transformations.", 
        componentId: "syntax-basics",
        details: {
          definition: "Shadowing lets you declare a new variable with the same name as a previous one. It allows you to transform a value (or change its type) while keeping the same identifier.",
          syntax: "let x = 5;\nlet x = x + 1;\nlet x = \"text\";",
          practical: "let input = \"42\";\nlet input = input.parse::<i32>().unwrap();",
          explanation: "Unlike mutability, shadowing creates a distinct new variable. This means you don't need a mutable reference to change a value's representation."
        }
      },
      { 
        id: "6", 
        title: "Integer Depths", 
        description: "Navigating fixed-width numeric types.", 
        componentId: "syntax-basics",
        details: {
          definition: "Rust offers precise control over integer sizes, from 8-bit to 128-bit, both signed (i) and unsigned (u). This precision is vital for performance and memory optimization.",
          syntax: "let a: i32 = -5; // 32-bit signed\nlet b: u8 = 255; // 8-bit unsigned",
          practical: "let pixels: u32 = 1920 * 1080;\nlet age: u8 = 25;",
          explanation: "Each type has a range (e.g., u8 is 0-255). If you exceed this range, Rust provides safety checks (panics in debug, wraps in release) to handle overflow."
        }
      },
      { 
        id: "7", 
        title: "Floating Point Precision", 
        description: "Handling decimals safely.",
        componentId: "float-precision",
        details: {
          definition: "Rust has two primitive types for floating-point numbers: f32 and f64. f64 is the default as it provides more precision on modern CPUs.",
          syntax: "let x = 2.0; // f64 (default)\nlet y: f32 = 3.0; // f32",
          practical: "let pi = 3.1415926535;\nlet radius = 10.0;\nlet area = pi * radius * radius;",
          explanation: "Floating point numbers are represented according to the IEEE-754 standard, with f32 being single precision and f64 being double precision."
        }
      },
      { 
        id: "8", 
        title: "Boolean Logic", 
        description: "The foundations of truth.",
        componentId: "boolean-logic",
        details: {
          definition: "The boolean type in Rust has two possible values: true and false. It is one byte in size.",
          syntax: "let is_active = true;\nlet is_finished: bool = false;",
          practical: "if is_active && !is_finished {\n    println!(\"Keep going!\");\n}",
          explanation: "Booleans are used primarily for control flow in 'if' expressions and 'while' loops."
        }
      },
      { 
        id: "9", 
        title: "Character Unicode", 
        description: "Beyond simple ASCII.",
        componentId: "unicode-char",
        details: {
          definition: "The 'char' type in Rust represents a Unicode Scalar Value, meaning it can represent a lot more than just ASCII characters.",
          syntax: "let c = 'z';\nlet heart_eyed_cat = '😻';",
          practical: "let first_letter = 'A';\nlet greek_alpha = 'α';",
          explanation: "A Rust 'char' is four bytes in size, which allows it to represent any Unicode character from emojis to special symbols."
        }
      },
      { 
        id: "10", 
        title: "Compound: Tuples", 
        description: "Grouping different types.",
        componentId: "tuple-compound",
        details: {
          definition: "A tuple is a general way of grouping together a number of values with a variety of types into one compound type.",
          syntax: "let tup: (i32, f64, u8) = (500, 6.4, 1);",
          practical: "let (x, y, z) = tup; // Destructuring\nprintln!(\"The value of y is: {}\", y);",
          explanation: "Tuples have a fixed length; once declared, they cannot grow or shrink in size. They are accessed using dot notation like 'tup.0'."
        }
      }
    ]
  },
  {
    id: "p2",
    title: "Phase 2: Logic Flow",
    color: "bg-cyan-500",
    topics: [
      { 
        id: "11", 
        title: "Function Signatures", 
        description: "Defining inputs and outputs.", 
        componentId: "functions",
        details: {
          definition: "Functions are the building blocks of Rust code. A signature defines the name, parameters (with types), and the return type of a function.",
          syntax: "fn add(x: i32, y: i32) -> i32 {\n    x + y\n}",
          practical: "fn calculate_area(width: f64, height: f64) -> f64 {\n    width * height\n}",
          explanation: "In Rust, parameter types are mandatory. The '->' symbol specifies the return type, making the function's interface clear and type-safe."
        }
      },
      { 
        id: "12", 
        title: "Expression Power", 
        description: "Everything returns a value.", 
        componentId: "functions",
        details: {
          definition: "Rust is an expression-oriented language. Most constructs, including blocks and if-statements, evaluate to a value.",
          syntax: "let x = { let y = 3; y + 1 }; // x is 4",
          practical: "let message = if is_valid { \"OK\" } else { \"Retry\" };",
          explanation: "By treating code blocks as expressions, Rust allows for concise assignments and functional-style programming without temporary variables."
        }
      },
      { 
        id: "13", 
        title: "The Semicolon Rule", 
        description: "Statement vs Expression.", 
        componentId: "functions",
        details: {
          definition: "In Rust, the presence or absence of a semicolon determines if a line is a statement (which performs an action) or an expression (which returns a value).",
          syntax: "fn get_five() -> i32 {\n    5 // No semicolon means return value\n}",
          practical: "fn log_and_return(val: i32) -> i32 {\n    println!(\"Value: {}\", val);\n    val // Returns val\n}",
          explanation: "The last expression in a block (without a semicolon) is automatically returned. Adding a semicolon turns it into a statement with a '()' (unit) return value."
        }
      },
      { 
        id: "14", 
        title: "Conditional If", 
        description: "Branching your logic.", 
        componentId: "control-flow",
        details: {
          definition: "The 'if' expression allows you to branch your code based on boolean conditions. Since it's an expression, it can also return values.",
          syntax: "if number < 5 {\n    println!(\"Small\");\n} else {\n    println!(\"Large\");\n}",
          practical: "let status = if authenticated { \"Access Granted\" } else { \"Forbidden\" };",
          explanation: "Every branch in an 'if' expression must return the same type if the result is being assigned to a variable."
        }
      },
      { 
        id: "15", 
        title: "Infinite Loop", 
        description: "Continuous execution.", 
        componentId: "control-flow",
        details: {
          definition: "The 'loop' keyword creates an infinite loop that continues until explicitly stopped by a 'break' statement.",
          syntax: "loop {\n    if condition { break; }\n}",
          practical: "let mut counter = 0;\nlet result = loop {\n    counter += 1;\n    if counter == 10 { break counter * 2; }\n};",
          explanation: "The 'loop' expression is powerful because it can return a value through the 'break' statement, unlike while or for loops."
        }
      },
      { 
        id: "16", 
        title: "While Conditionals", 
        description: "Looping until false.",
        details: {
          definition: "A 'while' loop executes a block of code as long as a boolean condition remains true.",
          syntax: "while number != 0 {\n    number -= 1;\n}",
          practical: "while let Some(task) = queue.pop() {\n    task.execute();\n}",
          explanation: "While loops are best for situations where you don't know the exact number of iterations in advance but have a clear exit condition."
        }
      },
      { 
        id: "17", 
        title: "For Range Iteration", 
        description: "Safe sequence traversal.",
        details: {
          definition: "The 'for' loop in Rust is used to iterate over a collection or a range of numbers. It is safer and more idiomatic than C-style for loops.",
          syntax: "for i in 1..4 {\n    println!(\"{}\", i);\n}",
          practical: "for element in [10, 20, 30].iter() {\n    println!(\"Value: {}\", element);\n}",
          explanation: "Rust's 'for' loop prevents 'off-by-one' errors and buffer overflows by using iterators that respect collection boundaries."
        }
      },
      { 
        id: "18", 
        title: "Match: Pattern Match", 
        description: "The power of match.", 
        componentId: "control-flow",
        details: {
          definition: "The 'match' expression allows you to compare a value against a series of patterns and execute code based on which pattern matches.",
          syntax: "match coin {\n    Coin::Penny => 1,\n    Coin::Nickel => 5,\n}",
          practical: "match Some(5) {\n    Some(x) => println!(\"Found {}\", x),\n    None => println!(\"Nothing found\"),\n}",
          explanation: "Matches in Rust are exhaustive: you must cover every possible case, or the code will not compile. This prevents unhandled state bugs."
        }
      },
      { 
        id: "19", 
        title: "Destructuring Patterns", 
        description: "Unpacking data in match.",
        details: {
          definition: "Pattern matching can be used to 'destructure' or pull apart complex data types like tuples, enums, and structs to access their internal values.",
          syntax: "let (x, y) = (1, 2);\nmatch point {\n    Point { x, y: 0 } => println!(\"On x axis\"),\n}",
          practical: "let colors = (255, 0, 0);\nlet (red, green, blue) = colors;",
          explanation: "Destructuring allows you to bind specific parts of a data structure to local variables, making code cleaner and more readable."
        }
      },
      { 
        id: "20", 
        title: "Block Scoping", 
        description: "Private variables in code blocks.",
        details: {
          definition: "A block is a collection of statements and expressions enclosed in curly braces. Variables defined inside a block are 'dropped' and inaccessible once the block ends.",
          syntax: "{\n    let x = 10;\n} // x is gone here",
          practical: "let outer = 5;\n{\n    let inner = 10;\n    println!(\"{}\", outer + inner);\n} // inner is dropped",
          explanation: "Scoping allows you to limit the lifetime of variables and manage memory efficiently without manual cleanup."
        }
      }
    ]
  },
  {
    id: "p3",
    title: "Phase 3: Ownership",
    color: "bg-emerald-500",
    topics: [
      { 
        id: "21", 
        title: "Memory Allocation", 
        description: "Stack vs Heap deep dive.", 
        componentId: "memory-model",
        details: {
          definition: "Rust gives you precise control over memory. The Stack is for fast, fixed-size data, while the Heap is for flexible, dynamic data that can grow at runtime.",
          syntax: "let x = 5; // Stack\nlet s = String::from(\"hello\"); // Heap",
          practical: "let mut vec = Vec::new(); // Allocates on heap\nvec.push(1);",
          explanation: "Stack allocation is automatic and fast because of its fixed size. Heap allocation requires a pointer on the stack, allowing for dynamic but slightly slower access."
        }
      },
      { 
        id: "22", 
        title: "Ownership Laws", 
        description: "The three core rules.", 
        componentId: "ownership",
        details: {
          definition: "Ownership is Rust's most unique feature. It ensures memory safety without a garbage collector through three strict rules.",
          syntax: "{\n    let s = String::from(\"hello\");\n} // s is dropped here",
          practical: "let s1 = String::from(\"hello\");\nlet s2 = s1; // s1 is no longer valid",
          explanation: "1. Each value has a variable called its owner. 2. There can only be one owner at a time. 3. When the owner goes out of scope, the value is dropped."
        }
      },
      { 
        id: "23", 
        title: "Move Semantics", 
        description: "Transferring resource control.", 
        componentId: "ownership",
        details: {
          definition: "When you assign a heap-allocated variable to another, Rust performs a 'move' rather than a shallow copy, invalidating the first variable to prevent double-free errors.",
          syntax: "let x = String::from(\"hi\");\nlet y = x; // x moved to y",
          practical: "fn take_ownership(s: String) { println!(\"{}\", s); }\nlet s = String::from(\"hi\");\ntake_ownership(s); // s is moved into function",
          explanation: "Move semantics ensure that memory is always owned by exactly one variable, eliminating the risk of multiple variables trying to free the same memory."
        }
      },
      { 
        id: "24", 
        title: "Clone vs Copy", 
        description: "Deep vs bitwise duplication.", 
        componentId: "ownership",
        details: {
          definition: "Types stored on the stack implement the 'Copy' trait for cheap duplication. Heap types require 'Clone' for an explicit, more expensive deep copy.",
          syntax: "let x = 5; let y = x; // Copy\nlet s1 = String::from(\"hi\"); let s2 = s1.clone(); // Clone",
          practical: "let list1 = vec![1, 2, 3];\nlet list2 = list1.clone(); // Both lists are now valid",
          explanation: "Use .clone() when you need a completely independent copy of heap data. Use Copy types when the performance cost of duplication is negligible."
        }
      },
      { 
        id: "25", 
        title: "Reference Borrowing", 
        description: "Access without ownership.", 
        componentId: "borrowing",
        details: {
          definition: "Borrowing allows you to create references to a value without taking ownership of it. This lets you use data in multiple places without copying it.",
          syntax: "let s = String::from(\"hi\");\nlet len = calculate_length(&s);",
          practical: "fn print_it(s: &String) { println!(\"{}\", s); }",
          explanation: "References are pointers with a guarantee: they will always point to valid memory. You can have unlimited immutable references to a value."
        }
      },
      { 
        id: "26", 
        title: "Mutable Borrows", 
        description: "Changing borrowed data.", 
        componentId: "borrowing",
        details: {
          definition: "A mutable reference (&mut) allows you to modify borrowed data. However, Rust restricts you to exactly one mutable reference to prevent data races.",
          syntax: "let mut s = String::from(\"hi\");\nchange(&mut s);",
          practical: "fn add_world(s: &mut String) { s.push_str(\", world\"); }",
          explanation: "While a mutable reference exists, no other references (immutable or mutable) can be created to that same data, ensuring exclusive access."
        }
      },
      { 
        id: "27", 
        title: "Aliasing Rules", 
        description: "The one-mut-or-many-immut rule.", 
        componentId: "borrowing",
        details: {
          definition: "Rust's borrow checker enforces a strict aliasing rule: you can have either many immutable references OR exactly one mutable reference, never both.",
          syntax: "let r1 = &s; let r2 = &s; // OK\n// let r3 = &mut s; // ERROR",
          practical: "let mut x = 5;\n{ let r1 = &mut x; *r1 += 1; } // r1 scope ends\nlet r2 = &x; // Now OK",
          explanation: "This rule is the secret to Rust's thread safety. It prevents 'data races' where one part of the code reads data while another part is writing it."
        }
      },
      { 
        id: "28", 
        title: "NLL: Non-Lexical Lifetimes", 
        description: "Smart compiler analysis.",
        details: {
          definition: "NLL is a compiler feature that makes the borrow checker smarter by tracking the actual usage of references rather than just their block scope.",
          syntax: "let mut s = String::from(\"hi\");\nlet r1 = &s;\nprintln!(\"{}\", r1);\nlet r2 = &mut s; // OK because r1 is no longer used",
          practical: "let mut data = vec![1, 2, 3];\nlet x = &data[0];\nprintln!(\"{}\", x);\ndata.push(4); // OK: x is 'dead' before push",
          explanation: "Before NLL, references lasted until the end of the curly braces. Now, they 'end' as soon as they are last used, making the borrow checker less restrictive."
        }
      },
      { 
        id: "29", 
        title: "Dangling Pointers", 
        description: "How Rust prevents them.",
        details: {
          definition: "A dangling pointer is a pointer that references a location in memory that may have been given to someone else. Rust prevents this through its lifetime system.",
          syntax: "fn dangle() -> &String {\n    let s = String::from(\"hi\");\n    &s // Error: s is dropped!\n}",
          practical: "let r;\n{\n    let x = 5;\n    r = &x; // Error: x doesn't live long enough\n}",
          explanation: "The compiler ensures that the data being referenced always lives longer than the reference itself, making memory corruption impossible."
        }
      },
      { 
        id: "30", 
        title: "Memory Safety Summary", 
        description: "The visual mental model.",
        details: {
          definition: "By combining ownership, borrowing, and lifetimes, Rust achieves complete memory safety without the overhead of a garbage collector.",
          syntax: "// No special syntax - it's the sum of all parts",
          practical: "// Safe, fast, concurrent systems programming\nlet safe_data = Arc::new(Mutex::new(data));",
          explanation: "Mastering these concepts transforms your mental model from 'hoping it doesn't crash' to 'knowing exactly why it's safe'."
        }
      }
    ]
  },
  {
    id: "p4",
    title: "Phase 4: Data Architecture",
    color: "bg-orange-500",
    topics: [
      { 
        id: "31", 
        title: "Slice References", 
        description: "Viewing part of a collection.", 
        componentId: "slices",
        details: {
          definition: "A slice is a dynamically sized view into a contiguous sequence of elements. It lets you reference a sub-section of a collection without copying the data.",
          syntax: "let slice = &array[1..3];",
          practical: "fn first_word(s: &String) -> &str {\n    &s[0..find_space(s)]\n}",
          explanation: "Slices are a type of reference, so they don't have ownership. They store a starting pointer and a length, allowing for safe, efficient memory access."
        }
      },
      { 
        id: "32", 
        title: "String vs &str", 
        description: "Managed vs Borrowed text.", 
        componentId: "slices",
        details: {
          definition: "Rust distinguishes between 'String' (growable, heap-allocated) and '&str' (a slice or reference to string data).",
          syntax: "let s = String::from(\"hi\");\nlet slice: &str = &s[..];",
          practical: "fn greet(name: &str) { println!(\"Hi {}\", name); }",
          explanation: "String is owned data. &str is a borrow. Using &str in function parameters makes your API more flexible, as it can accept both Strings and literal &str values."
        }
      },
      { 
        id: "33", 
        title: "Classic Structs", 
        description: "Named field data structures.", 
        componentId: "structs-enums",
        details: {
          definition: "Structs (structures) allow you to group related data into a single named type with named fields, similar to objects in other languages.",
          syntax: "struct User {\n    name: String,\n    age: u8,\n}",
          practical: "let user1 = User { name: String::from(\"Bob\"), age: 30 };",
          explanation: "Structs give your data semantic meaning. Every field has a name and a specific type, making your code self-documenting and type-safe."
        }
      },
      { 
        id: "34", 
        title: "Tuple Structs", 
        description: "Unnamed field data structures.",
        details: {
          definition: "Tuple structs look like tuples but have a name. They are useful for creating distinct types when field names would be redundant.",
          syntax: "struct Color(i32, i32, i32);\nlet black = Color(0, 0, 0);",
          practical: "struct Point(f64, f64);\nlet p = Point(10.5, 20.0);",
          explanation: "Even if two tuple structs have the same field types (e.g., Color and Point), they are treated as unique types by the compiler, preventing accidental mix-ups."
        }
      },
      { 
        id: "35", 
        title: "Unit-Like Structs", 
        description: "Zero-sized types for traits.",
        details: {
          definition: "Unit-like structs have no fields at all. They are used when you need to implement a trait on a type but don't need to store any data within the type itself.",
          syntax: "struct AlwaysEqual;\nimpl PartialEq for AlwaysEqual { ... }",
          practical: "struct MySystem;\n// Used as a marker or for trait implementations",
          explanation: "Unit-like structs occupy zero bytes in memory. They are perfect for defining behavior (via traits) without incurring any data overhead."
        }
      },
      { 
        id: "36", 
        title: "Implementing Methods", 
        description: "The impl block magic.", 
        componentId: "structs-enums",
        details: {
          definition: "Methods are functions defined within the context of a struct (or enum/trait). They are grouped inside 'impl' blocks.",
          syntax: "impl Rectangle {\n    fn area(&self) -> u32 { self.width * self.height }\n}",
          practical: "let rect = Rectangle { width: 10, height: 20 };\nprintln!(\"Area: {}\", rect.area());",
          explanation: "Methods take 'self' as their first parameter, representing the instance of the struct. This encapsulates logic directly with the data it operates on."
        }
      },
      { 
        id: "37", 
        title: "Self Referencing", 
        description: "Understanding &self and &mut self.",
        details: {
          definition: "When defining methods, you choose how to access the instance: '&self' for immutable access, '&mut self' for mutable access, or 'self' to take ownership.",
          syntax: "fn update(&mut self, val: u32) { self.val = val; }",
          practical: "user.deactivate(); // takes &mut self\nuser.get_name(); // takes &self",
          explanation: "Rust's ownership rules apply to methods too. Using &self is most common as it allows multiple parts of the code to call the method concurrently."
        }
      },
      { 
        id: "38", 
        title: "Enum Variants", 
        description: "One of many possibilities.", 
        componentId: "structs-enums",
        details: {
          definition: "Enums (enumerations) allow you to define a type by enumerating its possible variants. A variable of an enum type can be exactly one of its variants.",
          syntax: "enum IpAddrKind {\n    V4, V6,\n}",
          practical: "let four = IpAddrKind::V4;",
          explanation: "Enums are powerful for modeling domain logic where data can be one of a fixed set of categories (e.g., WebRequest::Get, WebRequest::Post)."
        }
      },
      { 
        id: "39", 
        title: "Enums with Data", 
        description: "Wrapping data in variants.", 
        componentId: "structs-enums",
        details: {
          definition: "In Rust, enum variants can store data directly. This allows you to group different types of related data under a single type name.",
          syntax: "enum Message {\n    Quit,\n    Write(String),\n    Move { x: i32, y: i32 },\n}",
          practical: "let m = Message::Write(String::from(\"hello\"));",
          explanation: "This is a form of 'Algebraic Data Type'. It replaces complex inheritance hierarchies with a clean, pattern-matchable structure."
        }
      },
      { 
        id: "40", 
        title: "The Option Pattern", 
        description: "Handling null safely.", 
        componentId: "option-result",
        details: {
          definition: "Rust does not have a null value. Instead, it uses the 'Option' enum to represent a value that could either be something ('Some') or nothing ('None').",
          syntax: "let x: Option<i32> = Some(5);\nlet y: Option<i32> = None;",
          practical: "match x {\n    Some(val) => println!(\"Value: {}\", val),\n    None => println!(\"Empty\"),\n}",
          explanation: "By forcing you to handle the 'None' case, Rust eliminates the dreaded 'Null Pointer Exception' at compile time."
        }
      }
    ]
  },
  {
    id: "p5",
    title: "Phase 5: Safety Net",
    color: "bg-amber-500",
    topics: [
      { 
        id: "41", 
        title: "Result for Errors", 
        description: "Failable operations.", 
        componentId: "option-result",
        details: {
          definition: "The 'Result' enum handles operations that can fail. It has two variants: 'Ok(T)' for success and 'Err(E)' for errors, making error handling mandatory.",
          syntax: "let res: Result<i32, &str> = Ok(10);",
          practical: "fn get_user(id: i32) -> Result<User, String> {\n    if id > 0 { Ok(User::new()) } else { Err(\"Invalid ID\".into()) }\n}",
          explanation: "Unlike exceptions, Results are values. You must acknowledge the possibility of failure, ensuring more robust and predictable code."
        }
      },
      { 
        id: "42", 
        title: "The Panic Protocol", 
        description: "Unrecoverable error handling.",
        details: {
          definition: "A panic is an unrecoverable error that causes the program to stop immediately. It should only be used for bugs that represent a corrupted state.",
          syntax: "panic!(\"System corrupted\");",
          practical: "let v = vec![1];\nlet x = v[10]; // Automatic panic",
          explanation: "When a panic occurs, Rust cleans up the stack (unwinding) to prevent resource leaks before exiting the program safely."
        }
      },
      { 
        id: "43", 
        title: "If Let Sugar", 
        description: "Concise pattern matching.",
        details: {
          definition: "'if let' is a cleaner way to handle enums when you only care about one specific variant, reducing the noise of a full match.",
          syntax: "if let Some(x) = opt { println!(\"{}\", x); }",
          practical: "if let Ok(data) = response { save(data); }",
          explanation: "It's syntactic sugar that combines a match arm and a variable binding into a single line for better readability."
        }
      },
      { 
        id: "44", 
        title: "While Let Sugar", 
        description: "Looping until pattern mismatch.",
        details: {
          definition: "'while let' repeatedly executes a block as long as a pattern continues to match the provided value.",
          syntax: "while let Some(x) = iter.next() { ... }",
          practical: "while let Ok(line) = stream.read_line() { process(line); }",
          explanation: "This is ideal for consuming stacks or iterators where you want to stop as soon as the source returns a different variant (like None)."
        }
      },
      { 
        id: "45", 
        title: "The ? Operator", 
        description: "Propagating errors cleanly.", 
        componentId: "error-patterns",
        details: {
          definition: "The '?' operator allows you to return an error from a function early if an operation fails, without nested if-else blocks.",
          syntax: "let file = File::open(\"config\")?;",
          practical: "fn setup() -> Result<(), Error> {\n    init_db()?;\n    load_cache()?;\n    Ok(())\n}",
          explanation: "If the result is Ok, it unwraps the value. If it's Err, it returns the error from the function, converting it if necessary."
        }
      },
      { 
        id: "46", 
        title: "Vector Vectors", 
        description: "Dynamic heap lists.", 
        componentId: "collections",
        details: {
          definition: "Vectors (Vec<T>) are dynamic arrays stored on the heap. They can grow or shrink at runtime, providing flexible sequence storage.",
          syntax: "let mut v = vec![1, 2, 3];",
          practical: "let mut list = Vec::new();\nlist.push(Item::new());",
          explanation: "Vectors own their data. When they go out of scope, all elements are dropped, and the heap memory is freed automatically."
        }
      },
      { 
        id: "47", 
        title: "Iterating Vectors", 
        description: "Accessing dynamic data.", 
        componentId: "collections",
        details: {
          definition: "Iteration allows you to process every element in a vector. In Rust, you can iterate by move, by reference, or by mutable reference.",
          syntax: "for x in &v { println!(\"{}\", x); }",
          practical: "let total: i32 = v.iter().sum();",
          explanation: "Using '&v' in a loop is the standard way to read elements without consuming the vector, allowing it to be used again later."
        }
      },
      { 
        id: "48", 
        title: "HashMap Storage", 
        description: "Key-value pair storage.", 
        componentId: "collections",
        details: {
          definition: "A HashMap stores values associated with unique keys, enabling fast lookups through a hashing algorithm.",
          syntax: "let mut map = HashMap::new();",
          practical: "map.insert(\"id_123\", User::new());",
          explanation: "HashMaps are the go-to structure for caches, frequency counters, and any data that needs fast indexed access by non-numeric keys."
        }
      },
      { 
        id: "49", 
        title: "Entry API", 
        description: "Efficient map updates.", 
        componentId: "collections",
        details: {
          definition: "The Entry API provides a unified way to check for a key and update or insert a value in a single operation.",
          syntax: "map.entry(\"key\").or_insert(0);",
          practical: "let count = counts.entry(word).or_insert(0);\n*count += 1;",
          explanation: "This pattern is efficient because it performs the hash lookup only once, even if the value needs to be inserted."
        }
      },
      { 
        id: "50", 
        title: "String Manipulation", 
        description: "Push, Pop, and Concatenate.",
        details: {
          definition: "The 'String' type is a growable, UTF-8 encoded sequence of bytes. You can modify it dynamically as your program runs.",
          syntax: "s.push_str(\" world\");",
          practical: "let mut s = String::new();\nfor i in 0..5 { s.push_str(&i.to_string()); }",
          explanation: "Rust ensures that any modification to a String results in valid UTF-8, protecting you from invalid character boundaries."
        }
      }
    ]
  },
  {
    id: "p6",
    title: "Phase 6: Abstraction",
    color: "bg-indigo-500",
    topics: [
      { id: "51", title: "Generic Types", description: "Abstracting over types.", componentId: "generics" },
      { id: "52", title: "Generic Methods", description: "Behavior for any type.", componentId: "generics" },
      { id: "53", title: "Trait Definition", description: "Defining shared behavior.", componentId: "traits" },
      { id: "54", title: "Implementing Traits", description: "Applying behaviors to types.", componentId: "traits" },
      { id: "55", title: "Trait Parameters", description: "Functions accepting traits.", componentId: "traits" },
      { id: "56", title: "Default Methods", description: "Traits with basic logic." },
      { id: "57", title: "Multiple Bounds", description: "The + syntax for traits." },
      { id: "58", title: "Where Clauses", description: "Cleaner generic constraints." },
      { id: "59", title: "Returning Traits", description: "The impl Trait syntax." },
      { id: "60", title: "Derive Magic", description: "Automatic trait implementations." }
    ]
  },
  {
    id: "p7",
    title: "Phase 7: Chronos",
    color: "bg-violet-500",
    topics: [
      { id: "61", title: "Lifetime Basics", description: "How long refs live.", componentId: "explicit-lifetimes" },
      { id: "62", title: "Lifetime Annotation", description: "Naming scopes with 'a.", componentId: "explicit-lifetimes" },
      { id: "63", title: "Struct Lifetimes", description: "Holding refs in data.", componentId: "explicit-lifetimes" },
      { id: "64", title: "Lifetime Elision", description: "When the compiler infers." },
      { id: "65", title: "Static Lifetimes", description: "Living for the whole program." },
      { id: "66", title: "Trait Objects", description: "Dynamic dispatch with dyn.", componentId: "advanced-traits" },
      { id: "67", title: "Boxed Traits", description: "Heap allocated dynamic traits." },
      { id: "68", title: "Associated Types", description: "Types within traits.", componentId: "advanced-traits" },
      { id: "69", title: "Default Generics", description: "Simplifying generic usage." },
      { id: "70", title: "Operator Overload", description: "Custom math for types." }
    ]
  },
  {
    id: "p8",
    title: "Phase 8: Functional",
    color: "bg-rose-500",
    topics: [
      { id: "71", title: "Closure Intro", description: "Anonymous logic blocks." },
      { id: "72", title: "Closure Capture", description: "Borrowing vs Moving environment.", componentId: "closures" },
      { id: "73", title: "The Fn Traits", description: "Fn, FnMut, and FnOnce." },
      { id: "74", title: "Iterator Trait", description: "The core of sequence logic.", componentId: "iterators" },
      { id: "75", title: "Map & Filter", description: "Transforming and selecting.", componentId: "iterators" },
      { id: "76", title: "Fold & Reduce", description: "Condensing sequences." },
      { id: "77", title: "IntoIterator", description: "Converting to sequences." },
      { id: "78", title: "Zero-Cost Iters", description: "Performance of abstraction." },
      { id: "79", title: "Custom Iterators", description: "Defining your own sequence." },
      { id: "80", title: "Iters vs Loops", description: "When to use which." }
    ]
  },
  {
    id: "p9",
    title: "Phase 9: Systems",
    color: "bg-blue-600",
    topics: [
      { id: "81", title: "Boxed Memory", description: "Recursive heap types.", componentId: "smart-pointers" },
      { id: "82", title: "Shared Rc<T>", description: "Reference counting.", componentId: "smart-pointers" },
      { id: "83", title: "RefCell Mutability", description: "Interior mutability pattern.", componentId: "interior-mutability" },
      { id: "84", title: "Thread Spawning", description: "Parallel execution basics.", componentId: "concurrency" },
      { id: "85", title: "MPSC Channels", description: "Message passing between threads." },
      { id: "86", title: "Shared Arc<T>", description: "Thread-safe shared refs.", componentId: "concurrency" },
      { id: "87", title: "Mutex & Locks", description: "Synchronized access.", componentId: "concurrency" },
      { id: "88", title: "Send & Sync", description: "Concurrency marker traits." },
      { id: "89", title: "Atomics", description: "Lock-free low level sync." },
      { id: "90", title: "Fearless Concurrency", description: "The Rust guarantee." }
    ]
  },
    {
      id: "p10",
      title: "Phase 10: Graduation",
      color: "bg-purple-600",
      topics: [
        { 
          id: "91", 
          title: "Async Futures", 
          description: "Non-blocking execution.", 
          componentId: "async",
          details: {
            definition: "Futures are placeholders for values that haven't been computed yet. Rust's async system is pull-based, meaning futures do nothing until polled.",
            syntax: "async fn example() -> i32 { 42 }\nlet future = example();\nlet val = future.await;",
            practical: "async fn fetch_json(url: &str) -> Result<Value, Error> {\n    reqwest::get(url).await?.json().await\n}",
            explanation: "The 'async' keyword transforms a function into a state machine. '.await' allows the current task to yield if the future isn't ready."
          }
        },
        { 
          id: "92", 
          title: "Async Runtimes", 
          description: "Tokio and beyond.", 
          componentId: "async",
          details: {
            definition: "Rust's standard library provides the interface for async, but not the runtime. Runtimes like Tokio manage threads and poll futures.",
            syntax: "#[tokio::main]\nasync fn main() {\n    // your async code\n}",
            practical: "tokio::spawn(async move {\n    println!(\"Running in background\");\n});",
            explanation: "A runtime provides the executor that drives futures to completion and the reactor that handles I/O events."
          }
        },
        { 
          id: "93", 
          title: "Function Pointers", 
          description: "Passing raw logic blocks.", 
          componentId: "compiler-logic",
          details: {
            definition: "Function pointers (fn) allow you to pass functions as arguments. Unlike closures, they don't capture any state from their environment.",
            syntax: "fn do_math(f: fn(i32) -> i32, x: i32) -> i32 { f(x) }",
            practical: "fn square(x: i32) -> i32 { x * x }\nlet result = do_math(square, 4);",
            explanation: "Because they have no state, 'fn' pointers are the same size as a regular pointer and implement Copy."
          }
        },
        { 
          id: "94", 
          title: "Unsafe Superpowers", 
          description: "When to break the rules.", 
          componentId: "unsafe",
          details: {
            definition: "Unsafe Rust allows actions the compiler can't verify for safety, granting access to 'superpowers' like dereferencing raw pointers.",
            syntax: "unsafe {\n    // perform unsafe operations\n}",
            practical: "let mut num = 5;\nlet r1 = &num as *const i32;\nunsafe { println!(\"{}\", *r1); }",
            explanation: "Using 'unsafe' doesn't mean the code is wrong; it means the developer is taking responsibility for memory safety."
          }
        },
        { 
          id: "95", 
          title: "Raw Pointers", 
          description: "*const and *mut T.", 
          componentId: "unsafe",
          details: {
            definition: "Raw pointers are like C pointers. They don't have lifetimes, can be null, and aren't subject to borrowing rules.",
            syntax: "let p: *const i32 = &some_val;\nlet p_mut: *mut i32 = &mut some_val;",
            practical: "let address = 0x12345 as *const u32;\nunsafe { let value = *address; }",
            explanation: "Raw pointers are used for FFI and for creating low-level abstractions that require precise memory control."
          }
        },
        { 
          id: "96", 
          title: "FFI Interface", 
          description: "Calling C from Rust.", 
          componentId: "problem-solving",
          details: {
            definition: "Foreign Function Interface (FFI) lets Rust call functions from other languages (usually C) and vice versa.",
            syntax: "extern \"C\" {\n    fn abs(input: i32) -> i32;\n}",
            practical: "unsafe {\n    println!(\"Abs of -3 is {}\", abs(-3));\n}",
            explanation: "The 'extern' block defines the foreign signatures, and calling them always requires an 'unsafe' block."
          }
        },
        { 
          id: "97", 
          title: "Macro_rules!", 
          description: "Declarative metaprogramming.", 
          componentId: "macros",
          details: {
            definition: "Declarative macros use pattern matching to transform syntax. They act like 'match' but for the Rust AST.",
            syntax: "macro_rules! hello {\n    () => { println!(\"Hello!\"); }\n}",
            practical: "vec![1, 2, 3]; // The vec! macro expands to multiple statements",
            explanation: "Macros expand before type checking, allowing for features like variable argument counts and domain-specific languages."
          }
        },
        { 
          id: "98", 
          title: "Procedural Macros", 
          description: "Syntax manipulation.", 
          componentId: "macros",
          details: {
            definition: "Procedural macros are Rust functions that consume a token stream and produce a new one as output during compilation.",
            syntax: "#[derive(Serialize)]\nstruct User { name: String }",
            practical: "#[post(\"/login\")]\nfn login() { ... }",
            explanation: "There are three types: Derive, Attribute-like, and Function-like. They are much more powerful than declarative macros."
          }
        },
        { 
          id: "99", 
          title: "Binary Layout", 
          description: "ABI and Memory alignment.", 
          componentId: "memory-layout",
          details: {
            definition: "Understanding how Rust organizes types in RAM, including field reordering, padding, and alignment.",
            syntax: "#[repr(C)]\nstruct FFICompatible { x: i32, y: u8 }",
            practical: "std::mem::size_of::<MyType>();\nstd::mem::align_of::<MyType>();",
            explanation: "Rust reorders struct fields to minimize padding unless you specify a different representation like #[repr(C)]."
          }
        },
        { 
          id: "100", 
          title: "Grand Finale", 
          description: "Mastering the compiler.", 
          componentId: "congrats",
          details: {
            definition: "Congratulations! You've navigated the complexities of Rust and built a strong mental model of its internals.",
            syntax: "fn main() {\n    println!(\"Mission Accomplished!\");\n}",
            practical: "let rustacean = Master::new();\nrustacean.build_systems();",
            explanation: "You are now ready to build high-performance, memory-safe software that pushes the boundaries of systems programming."
          }
        }
      ]
    }
  ];
  