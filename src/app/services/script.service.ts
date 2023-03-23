import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }



  LoadRawScript(src: string) {
    let node = document.createElement('script'); // creates the script tag 
    node.type = 'text/javascript'; // set the script type
    //node.async = true; 
    node.innerHTML = src;
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  LoadScriptFromURL(url: string) {
    let node = document.createElement('script'); // creates the script tag

    node.type = 'text/javascript'; // set the script type
    //node.async = true; // makes script run asynchronously
    //node.charset = 'utf-8';
    // append to head of document

    node.src = url;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}