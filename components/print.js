export default function printPaper(
  data,
  tax,
  total,
  invoiceNumber,
  qrCodeImage,
  marchentName,
  marchentAddress
) {
  return String(`
<style>
#invoice-POS{
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding:0.25cm;
  margin: 0 auto;
  width: 6cm;
  background: #FFF;
  
}
::selection {background: #f31544; color: #FFF;}
::moz-selection {background: #f31544; color: #FFF;}
h1{
  font-size: 12px;
  color: #222;
}
h2{font-size: 10px;}
h3{
  font-size: 10px;
  font-weight: 300;
}
.cont{
  display:flex;
  width:100%;
  justify-content:center;
}
p{
  font-size: 8px;
  color: #666;
}

#top, #mid,#bot{ /* Targets all id with 'col-' */
border-bottom: 1px solid #EEE;
}

#top{min-height: 2cm;}
#mid{min-height: 2cm;} 
#bot{ min-height: 2cm;}

#top .logo{
  height: 40px;
	width: 40px;
	background: url('https://www.kifapos.com/public/assets/media/logos/logo-5.png') no-repeat;
	background-size: 40px 40px;  filter: grayscale(100%);
}
.clientlogo{
  float: left;
	height: 40px;
	width: 40px;
	background: url('https://www.kifapos.com/public/assets/media/logos/logo-5.png') no-repeat;
	background-size: 40px 40px;
  border-radius: 40px;  filter: grayscale(100%);
}
.info{
  display: block;
  //float:left;
  margin-left: 0;
}
.title{
  float: right;
}
.title p{text-align: right;} 
table{
  width: 100%;
  border-collapse: collapse;
}
td{
  //padding: 5px 0 5px 15px;
  //border: 1px solid #EEE
}
.tabletitle{
  //padding: 5px;
  font-size: 12px;
  background: #EEE;
}
.service{border-bottom: 1px solid #EEE;}
.item{width: 24mm;}
.itemtext{font-size: 10px;}

#legalcopy{
  margin-top: 5mm;
}

  </style>
  
  
  
  <div id='invoice-POS'>
  
  <center id='top'>
  <div class='logo'></div>
  <div class='info'> 
  <h2>KIFA POS</h2>
  </div><!--End Info-->
  </center><!--End InvoiceTop-->
  
  <div id='mid'>
  <div class='info'>
  <h2>Contact Info</h2>
  <p> 
  #: ${invoiceNumber}</br>
  marchent: ${marchentName}  </br>
  Phone   : ${marchentAddress}</br>
  Date    : ${marchentAddress}</br>
  </p>
  </div>
  </div>
  
  <div id='bot'>
  
  <div id='table'>
  <table>
  <tr class='tabletitle'>
  <td class='item'><h2>Item</h2></td>
								<td class='Hours'><h2>Qty</h2></td>
								<td class='Rate'><h2>Sub Total</h2></td>
                </tr>
                
               ${
                 data
                   ? data.map(
                       (item) =>
                         ` <tr class='service'>
								<td class='tableitem'><p class='itemtext'>${item.name}</p></td>
								<td class='tableitem'><p class='itemtext'>${item.quantity}</p></td>
								<td class='tableitem'><p class='itemtext'>${item.price}</p></td>
                </tr>`
                     )
                   : ""
               }
                
                
                
                <tr class='tabletitle'>
								<td></td>
								<td class='Rate'><h2>tax</h2></td>
								<td class='payment'><h2>${tax ?? ""}</h2></td>
                </tr>
                
                <tr class='tabletitle'>
								<td></td>
								<td class='Rate'><h2>Total</h2></td>
								<td class='payment'><h2>${total ?? ""}</h2></td>
                </tr>
                
                </table>
                </div>
                
                <div id='legalcopy'>
                <p class="legal"><strong>Thank you!</strong>  
						</p>
            </div>
            
            </div>
            </div>`);
}
