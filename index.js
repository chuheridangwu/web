 // 获取建仓股价
 var priceEl = document.querySelector('.input_price')
 priceEl.addEventListener('input', event => {
     totalPrice()
     refreshData()
 })  
 // 获取建仓数量
 var numberEl = document.querySelector('.input_number')
 numberEl.addEventListener('input', event => {
     totalPrice()
     refreshData()
 }) 

 // 每次降低的比例
 var selScale = 0.05
 var selIndex = 0
 var mySelectEl = document.querySelector(".mySelect");
 mySelectEl.addEventListener("change", (event) => {  
     // 股票总持仓
     var titleEl = document.querySelector('.title')
     selIndex =  event.currentTarget.selectedIndex
     var optionValue = event.currentTarget.options[selIndex].textContent;  
     titleEl.textContent = optionValue;
     if (selIndex<4) {                
         selScale = 0.05 * (event.currentTarget.selectedIndex + 1);
     }

     totalPrice()
     refreshData() 
 }); 

 // 仓库总价
 function totalPrice() {
     var price = Number(numberEl.value) * Number(priceEl.value)
     // 总价
     var totalPriceEl = document.querySelector('.total_price')
     totalPriceEl.textContent = price
     // 均价
     var averageEl = document.querySelector('.average_price')
     averageEl.textContent = Number(priceEl.value).toFixed(2)
     // 股票总持仓
     var holdEl = document.querySelector('.hold_number')
     holdEl.textContent = numberEl.value
 }    

 var rows = []
 
 function refreshData() {
     var preNum = Number(numberEl.value)
     var prePrice = Number(priceEl.value).toFixed(2)
     var preTotalPrice = Number(numberEl.value) * Number(priceEl.value)
    
     var table = document.querySelector('.table');
     for (var i = 0; i < 5; i++) { 
         row = rows[i]
         if (!row) {
             row = {}
         }

         // 创建一个新的 tr 元素  
         var tr = document.createElement('tr');
         var key1 = "tr"+i
         if (row[key1]) {
             tr = row[key1]
         }

         // 特殊补仓时，selScale需要根据特别情况进行修改
         if (selIndex >= 4) {
             selScale = 0.05 * (i + 1)
         }
         var price = (prePrice - prePrice * selScale).toFixed(2);
         for (var j = 0; j < 9; j++) {  
             // 为 tr 元素添加一个 td 元素  
             var td = document.createElement('td'); 

             var key2 = "td"+j
             if (row[key2]) {
                 td = row[key2]
             }
             switch (j) {
                 case 0: // 索引
                     td.textContent = i + 2;  
                     break;
                 case 1: // 亏损比例
                     var scale = (prePrice - price) / prePrice * 100
                     td.textContent = prePrice + '亏损' + scale.toFixed(0) + "%";  
                     break;
                 case 2: // 股票价格
                     td.textContent = price; 
                     prePrice = price;
                     break;
                 case 3: // 当前股票数量
                     td.textContent = preNum + " 股";
                     break;
                 case 4: // 股票总数量
                     preNum = preNum * 2; 
                     td.textContent = preNum + " 股";
                     break;
                 case 5: // 补仓成本
                     td.textContent = (price * (preNum / 2)).toFixed();
                     break;
                 case 6: // 持仓总成本
                     var total = price * (preNum / 2) + preTotalPrice;
                     var price = price * (preNum / 2);
                     td.textContent = Math.round(price) + "+" + preTotalPrice + "=" + total;
                     preTotalPrice = total
                     break;
                 case 7: // 补仓后股价
                     td.textContent = (preTotalPrice / preNum).toFixed(2)   
                     break;
                 default: // 需要涨回多少回来
                     var price = (preTotalPrice / preNum).toFixed(2) 
                     var aveavt = (price - prePrice) / prePrice * 100
                     td.textContent = aveavt.toFixed(2) + "%";  
                     break;
             } 
             if (!row[key2]) {
                 tr.appendChild(td);
             }
             row[key2] = td
         }
         // 如果trs中没有的话再添加到table
         if (!row[key1]) {                   
             // 将 tr 元素添加到表格中  
             table.appendChild(tr); 
         }
         row[key1] = tr 
         rows.push(row)
     }
 }

 refreshData()

 var calculateEl = document.querySelector('.input_calculate')
 calculateEl.addEventListener("change", (event) => {  
     var titleEl = document.querySelector('.calculate_text')
     let value = Number(event.currentTarget.value)
     let textContent = ""
     let percentage = 0.1
     for (let index = 1; index < 5; index++) {
         textContent = textContent + "\n" + (value - percentage * value).toFixed(2)
         percentage += 0.1
     }
     titleEl.textContent = textContent
 }); 