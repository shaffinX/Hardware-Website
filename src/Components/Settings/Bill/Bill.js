import {ref,get} from 'firebase/database';
import * as html2pdf  from "html2pdf.js";
import logo from '../../../Assets/logo.png'
import {database} from '../../../firebase';
async function Data()
{
  const reference = ref(database,'Bill/');
  const snapshot = get(reference);
  let bill=[];
  bill = (await snapshot).val();

  return bill;

}
function Total(bill)
{
  let total=0;
  for (let i = 0; i < bill.length; i++) {
    total+=(bill[i].price*bill[i].quantity)
  }
  return total
}
function TotalCost(bill)
{
  let total=0;
  for (let i = 0; i < bill.length; i++) {
    total+=(bill[i].cp*bill[i].quantity)
  }
  return total
}
export default async function Bill()
{
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  let bill = await Data();
  let total = await Total(bill);
  let totalCost = await TotalCost(bill);
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
                  <th style=" background-color: #FA8241;color: #fff;">Part#</th>
                  <th style=" background-color: #FA8241;color: #fff;">Name</th>
                  <th style=" background-color: #FA8241;color: #fff;">Size</th>
                  <th style=" background-color: #FA8241;color: #fff;">Total Cost</th>
                  <th style=" background-color: #FA8241;color: #fff;">Total</th>
                  <th style=" background-color: #FA8241;color: #fff;">Profit</th>
              </tr>
          </thead>
          <tbody>
          `;
  htmlString+=
  bill.map((x,i)=>{
    return(
      `<tr style="border-bottom: 2px solid #FA8241;">
        <td style="padding-top: 5px;padding-bottom: 5px;">${x.partno}</td>
        <td style="padding-top: 5px;padding-bottom: 5px;">${x.name} x ${x.quantity}</td>
        <td style="padding-top: 5px;padding-bottom: 5px;">${x.size}</td>
        <td style="padding-top: 5px;padding-bottom: 5px;">${x.cp*x.quantity}</td>
        <td style="padding-top: 5px;padding-bottom: 5px;">${x.price*x.quantity}</td>
        <td style="padding-top: 5px;padding-bottom: 5px;">${parseInt(x.price*x.quantity)-parseInt(x.cp*x.quantity)}</td>
    </tr>`
    )
  })
  
  htmlString+=`
          </tbody>
      </table>
      <div style="text-align:right;padding-top:20px">
          <h6 style="font-family: Arial, Helvetica, sans-serif;">Total Cost: ${totalCost}</h6>
          <h6 style="font-family: Arial, Helvetica, sans-serif;">Total Sell: ${total}</h6>
          <h6 style="font-family: Arial, Helvetica, sans-serif;">Total Profit: ${parseInt(total)-parseInt(totalCost)}</h6>
      </div>
  </div>
`;

const element = document.createElement('div');
  element.innerHTML = htmlString;

  html2pdf()
    .from(element)
    .set({
      margin: 0.3,
      filename: `${month}_Revenue_Bill.pdf`,
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .save();


}