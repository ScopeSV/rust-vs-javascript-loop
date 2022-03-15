use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct Obj {
    index: usize
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Array<string, number>")]
    type MyArray;
}

#[wasm_bindgen]
pub fn create_rust_objects(amount: usize) -> JsValue {
    let mut arr: Vec<Obj> = vec![];
    arr.reserve(amount);

    for i in 0..amount {
        let itm = Obj { index: i };
        arr.push(itm);
    }

    JsValue::from_serde(&arr).unwrap()
}

