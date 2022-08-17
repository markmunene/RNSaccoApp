// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {icons, images, COLORS, SIZES, FONTS} from '../constants';
// import moment from 'moment';
// import {useSelector} from 'react-redux';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNPrint from 'react-native-print';

// const PdfHtml = ({accountType}) => {
//   let deposit = useSelector(state => state.deposit.deposit);
//   const AuthUser = useSelector(state => state.users.AuthUser);
//   const [DepositData, setDepositData] = React.useState([]);
//   React.useEffect(() => {
//     let temp = [];
//     deposit.filter(deposit => {
//       if (deposit.accountType == accountType) {
//         // console.log(deposit);
//         temp.push(deposit);
//       }
//     });
//     setDepositData(temp);
//   }, [deposit]);
//   let TotalSalesProfit = 90;

//   const html = `
// <html>
// 	<head>
// 		<meta charset="utf-8">
// 		<title>Invoice</title>

// 		<link rel="license" href="https://www.opensource.org/licenses/mit-license/">
// 		<script src="script.js"></script>
// <style >
// /* reset */

// *
// {
// 	border: 0;
// 	box-sizing: content-box;
// 	color: inherit;
// 	font-family: inherit;
// 	font-size: inherit;
// 	font-style: inherit;
// 	font-weight: inherit;
// 	line-height: inherit;
// 	list-style: none;
// 	margin: 0;
// 	padding: 0;
// 	text-decoration: none;
// 	vertical-align: top;
// }

// /* content editable */

// *[contenteditable] { border-radius: 0.25em; min-width: 1em; outline: 0; }

// *[contenteditable] { cursor: pointer; }

// *[contenteditable]:hover, *[contenteditable]:focus, td:hover *[contenteditable], td:focus *[contenteditable], img.hover { background: #DEF; box-shadow: 0 0 1em 0.5em #DEF; }

// span[contenteditable] { display: inline-block; }

// /* heading */

// h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

// /* table */

// table { font-size: 75%; table-layout: fixed; width: 100%; }
// table { border-collapse: separate; border-spacing: 2px; }
// th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
// th, td { border-radius: 0.25em; border-style: solid; }
// th { background: #EEE; border-color: #BBB; }
// td { border-color: #DDD; }

// /* page */

// html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
// html { background: #999; cursor: default; }

// body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
// body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

// /* header */

// header { margin: 0 0 3em; }
// header:after { clear: both; content: ""; display: table; }

// header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
// header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
// header address p { margin: 0 0 0.25em; }
// header span, header img { display: block; float: right; }
// header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
// header img { max-height: 100%; max-width: 100%; }
// header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }

// /* article */

// article, article address, table.meta, table.inventory { margin: 0 0 3em; }
// article:after { clear: both; content: ""; display: table; }
// article h1 { clip: rect(0 0 0 0); position: absolute; }

// article address { float: left; font-size: 125%; font-weight: bold; }

// /* table meta & balance */

// table.meta, table.balance { float: right; width: 36%; }
// table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

// /* table meta */

// table.meta th { width: 40%; }
// table.meta td { width: 60%; }

// /* table items */

// table.inventory { clear: both; width: 100%; }
// table.inventory th { font-weight: bold; text-align: center; }

// table.inventory td:nth-child(1) { width: 26%; }
// table.inventory td:nth-child(2) { width: 38%; }
// table.inventory td:nth-child(3) { text-align: right; width: 12%; }
// table.inventory td:nth-child(4) { text-align: right; width: 12%; }
// table.inventory td:nth-child(5) { text-align: right; width: 12%; }

// /* table balance */

// table.balance th, table.balance td { width: 50%; }
// table.balance td { text-align: right; }

// /* aside */

// aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
// aside h1 { border-color: #999; border-bottom-style: solid; }

// /* javascript */

// .add, .cut
// {
// 	border-width: 1px;
// 	display: block;
// 	font-size: .8rem;
// 	padding: 0.25em 0.5em;
// 	float: left;
// 	text-align: center;
// 	width: 0.6em;
// }

// .add, .cut
// {
// 	background: #9AF;
// 	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
// 	background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
// 	background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
// 	border-radius: 0.5em;
// 	border-color: #0076A3;
// 	color: #FFF;
// 	cursor: pointer;
// 	font-weight: bold;
// 	text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
// }

// .add { margin: -2.5em 0 0; }

// .add:hover { background: #00ADEE; }

// .cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
// .cut { -webkit-transition: opacity 100ms ease-in; }

// tr:hover .cut { opacity: 1; }

// @media print {
// 	* { -webkit-print-color-adjust: exact; }
// 	html { background: none; padding: 0; }
// 	body { box-shadow: none; margin: 0; }
// 	span:empty { display: none; }
// 	.add, .cut { display: none; }
// }

// @page { margin: 0; }
//     </style>
// 	</head>
// 	<body>
// 		<header>
// 			<h1>Sales Report</h1>
// 			<address contenteditable>
// 				<p>Jonathan Neal</p>
// 				<p>101 E. Chapman Ave<br>Orange, CA 92866</p>
// 				<p>(800) 555-1234</p>
// 			</address>
// 			<span><img alt="" src="http://www.jonathantneal.com/examples/invoice/logo.png"><input type="file" accept="image/*"></span>
// 		</header>
// 		<article>
// 			<h1>Statement Report</h1>
// 			<address contenteditable>
// 				<p>Sky Star<br> Sacco Limited</p>
// 			</address>
// 			<table class="meta">
// 				<tr>
// 					<th><span contenteditable>Transactions #</span></th>
// 					<td><span contenteditable>${Date.now()}</span></td>
// 				</tr>
// 				<tr>
// 					<th><span contenteditable>Date</span></th>
// 					<td><span contenteditable>${moment(Date.now()).format(
//             'MMMM Do YYYY',
//           )}</span></td>
// 				</tr>
// 				<tr>
// 					<th><span contenteditable>Total Amount</span></th>
// 					<td><span id="prefix" contenteditable>Kesh</span><span>${DepositData.reduce(
//             (acc, item) => {
//               return acc + Number(item.Amount);
//             },
//             0,
//           )}</span></td>
// 				</tr>
// 			</table>
// 			<table class="inventory">
// 				<thead>
// 					<tr>
// 						<th><span contenteditable>Name</span></th>

// 						<th><span contenteditable>Phone Number</span></th>
//                          <th><span contenteditable>Deposit Method</span></th>
// 						<th><span contenteditable>Amount</span></th>
//                         <th><span contenteditable>GroupName</span></th>
// 						<th><span contenteditable>Date</span></th>
// 					</tr>
// 				</thead>
// 				<tbody>
//         ${DepositData.map(item => {
//           return `
//               192.168.0.106
//               <tr>
//                 <td>
//                   <span contenteditable>${item.Name}</span>
//                 </td>
//                 <td>
//                   <span contenteditable>${item.Phone}</span>
//                 </td>
//                    <td>
//                   <span data-prefix>Kesh</span>
//                   <span contenteditable>${item.depositMethod}</span>
//                 </td>
//                 <td>
//                   <span contenteditable>${item.Amount}</span>
//                 </td>
//               <td>
//                   <span contenteditable>${item.groupName}</span>
//                 </td>

//                 <td>
//                   <span contenteditable>

//                     ${moment(item.date).format('MMMM Do YYYY')}
//                   </span>
//                 </td>
//               </tr>
//             `;
//         })}

// 				</tbody>
// 			</table>

// 			<table class="balance">

// 				<tr>
// 					<th><span contenteditable>Amount Paid</span></th>
// 					<td><span data-prefix>Kesh</span><span contenteditable>${DepositData.reduce(
//             (acc, item) => {
//               return acc + Number(item.Amount);
//             },
//             0,
//           )}</span></td>
// 				</tr>

// 			</table>
// 		</article>

// 	</body>
// </html>
// `;
//   const printPDF = async () => {
//     const results = await RNHTMLtoPDF.convert({
//       html: html,
//       fileName: 'SalesReport.pdf',
//       base64: true,
//     }).catch(err => console.log(err));

//     await RNPrint.print({filePath: results.filePath});
//   };
//   return printPDF();
// };

// export default PdfHtml;

// const styles = StyleSheet.create({});
