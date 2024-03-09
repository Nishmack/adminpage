function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
      price: event.target.price.value,
      productname: event.target.productname.value,
  };

  // Save data on server
  axios.post(
      "https://crudcrud.com/api/56990b05d99f4b3ba74c045910342d1d/appointmentData",
      userDetails
  )
  .then(response => {
      displayProductOnScreen(response.data);
  })
  .catch(error => {
      console.error(error);
  });

  // Clearing the input fields
  event.target.reset();
}

function displayProductOnScreen(productDetails) {
  const productItem = document.createElement("li");
  productItem.textContent = `${productDetails.price} - ${productDetails.productname}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Product";
  productItem.appendChild(deleteBtn);

  const productList = document.querySelector("ul");
  productList.appendChild(productItem);

  // Delete data from server and screen
  deleteBtn.addEventListener("click", () => {
      const productId = productDetails._id; // Assuming id is present in product details
      axios.delete(`https://crudcrud.com/api/56990b05d99f4b3ba74c045910342d1d/appointmentData/${productId}`)
          .then(() => {
              productList.removeChild(productItem);
              updateTotalValue(-productDetails.price); // Update total value after deletion
          })
          .catch(error => {
              console.error(error);
          });
  });

  // Update total value
  updateTotalValue(productDetails.price);
}

function updateTotalValue(price) {

    // Get the <h4> element where total value will be displayed
    const totalValueElement = document.querySelector('h4');
    
    // Get the current total value from the element's text content
    let currentValueText = totalValueElement.textContent.split(':')[1].trim();
    
    // Parse the current value as a float, if possible
    let currentValue = parseFloat(currentValueText);
    
    // Check if currentValue is a valid number, if not, set it to 0
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    
    // Add the new price to the current total value
    currentValue += price;
    
    // Update the text content of the <h4> element with the new total value
    totalValueElement.textContent = `Total Value Worth of Product: Rs ${currentValue}`;
  }
  
 


window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/56990b05d99f4b3ba74c045910342d1d/appointmentData")
      .then(response => {
          console.log(response);
          for (const product of response.data) {
              displayProductOnScreen(product);
          }
      })
      .catch(error => {
          console.error(error);
      });
});
