var i, j, selectBox, selectBoxOriginalSelect, selectBoxSelect, selectBoxOptionlist, selectBoxOption;
selectBox = document.getElementsByClassName("select-box");
for (i = 0; i < selectBox.length; i++) {
  selectBoxOriginalSelect = selectBox[i].getElementsByTagName("select")[0];
  //For each element, create a new DIV that will act as the selected item
  selectBoxSelect = document.createElement("DIV");
  selectBoxSelect.setAttribute("class", "select-box-item");
  selectBoxSelect.innerHTML = selectBoxOriginalSelect.options[selectBoxOriginalSelect.selectedIndex].innerHTML;
  selectBox[i].appendChild(selectBoxSelect);
  //For each element, create a new DIV that will contain the option list
  selectBoxOptionlist = document.createElement("DIV");
  selectBoxOptionlist.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selectBoxOriginalSelect.length; j++) {
    // For each option
    selectBoxOption = document.createElement("DIV");
    selectBoxOption.innerHTML = selectBoxOriginalSelect.options[j].innerHTML;
    selectBoxOption.addEventListener("click", function (e) {// When options clicked
      var y, i, k, parentSelect, selectedDiv;
      parentSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
      selectedDiv = this.parentNode.previousSibling;
      for (i = 0; i < parentSelect.length; i++) {
        if (parentSelect.options[i].innerHTML == this.innerHTML) {
          parentSelect.selectedIndex = i;
          selectedDiv.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      selectedDiv.click();
    });
    selectBoxOptionlist.appendChild(selectBoxOption);
  }
  selectBox[i].appendChild(selectBoxOptionlist);
  selectBoxSelect.addEventListener("click", function (e) {
    //When the select box is clicked, close any other select boxes and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-box-item");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);