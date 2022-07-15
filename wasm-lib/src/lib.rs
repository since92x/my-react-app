extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[no_mangle]
pub fn fib(n: i32) -> i32 {
	match n {
		0 => 0,
		1 => 1,
		_ => fib(n - 1) + fib(n - 2),
	}
}

#[test]
fn add_test() {
	assert_eq!(fib(30), 832040);
}
