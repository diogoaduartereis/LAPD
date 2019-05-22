import * as React from "react";

const IP = 'http://94.60.211.16:3100/';
const endpoints = {
    register: "register",
};

async function register() {
    try {
        let response = await fetch(IP + register);
        let responseJSON = await response.json();
        return responseJSON.data;
    } catch (error) {
        console.error('Error : ${error}');
    }
}
export {register};