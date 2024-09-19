import * as html2pdf  from "html2pdf.js";
import logo from '../../../Assets/logo.png'
function downloadpdf(cart,data,delivery)
{
    let htmlString = `
    <div>
        <div style="display: flex;justify-content: center;">
            <img width="170px" src="${logo}" alt="${logo}">
        </div>
        <div style="display: flex;justify-content: center;">
            <h4 style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #FA8241;">Bill Details</h4>
        </div>
        <table style="width:100%;border-collapse: collapse;font-size: medium;text-align: center; font-family: Arial, Helvetica, sans-serif;">
            <thead>
                <tr style="border-bottom: 2px solid #FA8241;">
                    <th style=" background-color: #FA8241;color: #fff;">Name</th>
                    <th style=" background-color: #FA8241;color: #fff;">Size</th>
                    <th style=" background-color: #FA8241;color: #fff;">Total</th>
                </tr>
            </thead>
            <tbody>
            `;
    htmlString+=
    cart.map((x,i)=>{
      return(
        `<tr style="border-bottom: 2px solid #FA8241;">
          <td style="padding-top: 5px;padding-bottom: 5px;">${x.name} x ${x.quantity}</td>
          <td style="padding-top: 5px;padding-bottom: 5px;">${x.size}</td>
          <td style="padding-top: 5px;padding-bottom: 5px;">${x.price*x.quantity}</td>
      </tr>`
      )
    })
    
    htmlString+=`
            </tbody>
        </table>
        <div style="text-align:right;padding-top:20px">
            <h6 style="font-family: Arial, Helvetica, sans-serif;">Sub-Total: ${data.total}</h6>
            <h6 style="font-family: Arial, Helvetica, sans-serif;">Shipping: ${delivery}</h6>
            <h6 style="font-weight:bold;font-family: Arial, Helvetica, sans-serif;">Total: ${parseInt(data.total)+parseInt(delivery)}</h6>
        </div>
        <div style="display: flex;justify-content: center;">
            <div style="border: 2px solid #303030;border-radius: 5px;padding: 20px;width: 100%; font-family: Arial, Helvetica, sans-serif;">
                <h5 style="font-weight:bold">Order Details</h5>
                <h6 style="padding-top:10;font-weight:bold">Contact Information</h6>
                <p>${data.name}<br/>${data.email}<br/>${data.phone}</p>
                <h6 style="padding-top:10;font-weight:bold">Shipping Address</h6>
                <p>${data.address}</p>
                <h6 style="padding-top:10;font-weight:bold">Payment Method</h6>
                <p>Cash On Delivery (COD)</p>
                <h6 style="padding-top:10;font-weight:bold">Billing Address</h6>
                <p>${data.address}</p>
            </div>
        </div>
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = htmlString;

  html2pdf()
    .from(element)
    .set({
      margin: 0.3,
      filename: `${data.name}_Bill.pdf`,
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .save();


}
export default downloadpdf;