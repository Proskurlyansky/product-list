"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const productInput = document.querySelector('.product-input');
  const addProductButton = document.querySelector('.todo-button');
  const productList = document.querySelector('.product-list');
  const position = document.querySelector('.position');
  const btnclear = document.querySelector('#btn-clear');
  const pp = document.querySelectorAll('.product-item');
  let itemPosition = 0;
  let itemValue = [];


  // ---------- class product ----------

  class Product {
    constructor(productName) {
      this.createDiv(productName);
    }
    createDiv(productName){

      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      // create input, add task and product div
      const newProduct = document.createElement('input');
      newProduct.value = productName;
      newProduct.disabled = true;
      newProduct.classList.add('product-item');
      productDiv.appendChild(newProduct);

      // create edit button
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="far fa-edit"></i>';
      editButton.classList.add('edit-btn');
      productDiv.appendChild(editButton);

      //create delete button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      productDiv.appendChild(trashButton);

      // append product div in html
      productList.prepend(productDiv);

      //clear input
      productInput.value = '';
    }
  }

  // ---------- events ----------

  addProductButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(productInput.value != '') {
      new Product(productInput.value);
      itemPosition++;
      checkPosition();
      saveProductsLS();
    }
  });
  productList.addEventListener('click', (event) => {
    const item = event.target;
    // click trash
    if(item.classList.value === 'trash-btn') {
      deletePosition(item);
    }
    // click edit
    else if(item.classList.value === 'edit-btn') {
      editPosition(item);
    }
    // click product
    else if(item.classList.value === 'product-item') {
      productFound(item);
    }
  });
  // click trash all
  btnclear.addEventListener('click', deleteAllPositions);

  // ---------- functions ----------

  // delete position
  function deletePosition(item) {
      item.parentElement.remove();
      itemPosition--;
      checkPosition();
      saveProductsLS();
  }

  // edit position
  function editPosition(item) {
    const input = item.parentElement.querySelector('.product-item');
    if(input.disabled) {
      input.disabled = false;
      input.style.color = 'rgb(212, 0, 0)';
      item.style.color = 'rgb(59, 146, 32)';
      input.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
          input.disabled = true;
          input.style.color = 'rgb(70, 70, 70)';
          item.style.color = 'rgb(207, 207, 207)';
        }
      });
    } else {
      input.disabled = true;
      input.style.color = 'rgb(70, 70, 70)';
      item.style.color = 'rgb(207, 207, 207)';
    }
    saveProductsLS();
  }

  // when product found
  function productFound(item) {
    if(item.disabled) {
      const pf = item.parentElement;
      pf.classList.toggle('add-product');
      if(pf.classList.contains('add-product')) {
        productList.append(pf);
      }
      saveProductsLS();
    } 
  }

  // check value position
  function checkPosition(){
    position.textContent = itemPosition;
  }

  // delete all positions
  function deleteAllPositions() {
    productList.innerHTML = '';
    itemValue = [];
    itemPosition = 0;
    saveProductsLS();
    checkPosition();
  }

  //save products in localStorage
  function saveProductsLS() {
    const allInput = document.querySelectorAll('.product-item');
    allInput.forEach((item, i) => {
      itemValue[i] = item.value;
    });
    localStorage.setItem('products', productList.innerHTML);
    localStorage.setItem('productValue', itemValue);
    localStorage.setItem('position', itemPosition);
  }

  // loading localStorage
  function loadingLS() {
    const data = localStorage.getItem('products');
    const dataValue = localStorage.getItem('productValue');
    const dataPosition = localStorage.getItem('position');
    if(data) {
      productList.innerHTML = data;
      itemValue = dataValue.split(',');
      const allInput = document.querySelectorAll('.product-item');
      allInput.forEach((item, i) => {
        item.value = itemValue[i];
      });
      itemPosition = dataPosition;
      checkPosition();
    }
  }

  loadingLS();

});