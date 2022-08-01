//한 콜라당 총 개수는 4개
//재고가 0이 되면 품절이미지로 바뀜.

const colaQty = {
  Original: 4,
  Violet: 4,
  Yellow: 4,
  Cool: 4,
  Green: 4,
  Orange: 4,
};

const price = 1000;
let myMoney = 25000;
let leftMoney = 0;
let requiredMoney = 0;

const colaButton = document.querySelectorAll(".choice-btn");
const acquireButton = document.querySelector(".acquire");
const returnButton = document.querySelector(".change-return");
const depositButton = document.querySelector(".deposit");
const colaCart = document.querySelector(".selected-cola");
const purchasedCart = document.querySelector(".my-cola-list-cont");
let changeMoney = document.querySelector(".change-won");
let depositMoney = document.querySelector(".deposit-money");
let balanceMoney = document.querySelector(".balance-won");
let totalSpent = document.querySelector(".total-amount");
balanceMoney.textContent = myMoney.toLocaleString() + " 원";

//돈 입금 버튼
depositButton.addEventListener("click", () => {
  if (depositMoney.value === "") {
    alert("돈을 넣어주세요! 💰");
  } else if (depositMoney.value > myMoney) {
    alert("돈이 부족해요! 😳");
  } else {
    myMoney -= parseInt(depositMoney.value);
    balanceMoney.textContent = myMoney.toLocaleString() + " 원";
    leftMoney += parseInt(depositMoney.value);
    console.log(leftMoney);
    changeMoney.textContent = leftMoney.toLocaleString();
    if (requiredMoney > 0) {
      acquireButton.disabled = false;
    }
  }
  depositMoney.value = "";
});

//거스름돈 반환 버튼
returnButton.addEventListener("click", () => {
  if (changeMoney.textContent) {
    myMoney += leftMoney;
    balanceMoney.textContent = myMoney.toLocaleString() + " 원";
    leftMoney = 0;
    changeMoney.textContent = "0";
    acquireButton.disabled = true;
  }
});

for (i = 0; i < colaButton.length; i++) {
  colaButton[i].addEventListener("click", (e) => {
    //선택한 콜라 재고 감소
    let colaID = e.target.id;
    //colaQty.colaID로 하면 undefined반환됨
    colaQty[colaID] = colaQty[colaID] - 1;
    requiredMoney = parseInt(requiredMoney) + 1 * 1000;
    const selectedItem = document.createElement("div");
    const selectedItemName = document.createElement("span");
    const selectedNum = document.createElement("div");
    const selectedImg = document.createElement("img");
    let selectedCola = colaCart.childNodes;
    let nameList = [];
    let matchName = `selected ${colaID}`;
    for (i = 0; i < selectedCola.length; i++) {
      nameList = [...nameList, selectedCola[i].className];
    }

    //획득할 콜라 목록에 추가
    if (!nameList.includes(matchName)) {
      console.log(colaCart.childNodes);
      if (leftMoney > 0) {
        acquireButton.disabled = false;
      }
      colaCart.appendChild(selectedItem);
      selectedItem.classList.add("selected", `${colaID}`);
      selectedItemName.innerHTML = `${colaID}_Cola`;
      selectedItem.appendChild(selectedNum);
      selectedItem.appendChild(selectedImg);
      selectedItem.appendChild(selectedItemName);
      selectedNum.classList.add("quantity", `${colaID}`);
      selectedNum.textContent = 1;
      selectedImg.classList.add("selected-img", `${colaID}`);
      selectedImg.src = `src/images/${colaID}_cola.png`;
    } else if (nameList.includes(matchName)) {
      let qtyNum = document.querySelector(`.quantity.${colaID}`);
      qtyNum.textContent = parseInt(qtyNum.textContent) + 1;
      //console.log(typeof document.querySelector(".quantity").innerHTML);
    }

    console.log(colaQty);
    console.log(requiredMoney);
    //재고 소진 시 sold-out 표시
    if (colaQty[colaID] === 0) {
      e.target.disabled = true;
      e.target.classList.add("sold-out");
    }
  });
}

acquireButton.addEventListener("click", () => {
  //선택된 아이템 구매목록으로 이동
  function removeAllItems(parent) {
    while (parent.firstChild) {
      purchasedCart.append(parent.firstChild);
      //parent.removeChild(parent.firstChild);
    }
  }

  if (leftMoney > 0 && leftMoney - requiredMoney >= 0) {
    leftMoney -= requiredMoney;
    requiredMoney = 0;
    changeMoney.textContent = leftMoney.toLocaleString();
    removeAllItems(colaCart);
    acquireButton.disabled = true;
  } else if (leftMoney < requiredMoney) {
    alert(`돈이 ${requiredMoney - leftMoney}원 부족해요! 😕`);
  }
});
