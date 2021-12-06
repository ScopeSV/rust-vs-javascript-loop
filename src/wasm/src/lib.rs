use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
// use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct Obj {
    index: usize
}

#[wasm_bindgen]
pub fn create_rust_objects(amount: usize) -> JsValue {
    //let mut arr : Vec<HashMap<&str, usize>> = vec![];
    let mut arr : Vec<Obj> = vec![];
    arr.reserve(amount);

    for i in 0..amount {
/*         let mut field = HashMap::new();
        field.insert("index", i);
        arr.push(field) */

        let itm = Obj { index: i };
        arr.push(itm);
    }

    JsValue::from_serde(&arr).unwrap()
}