var origBoard;
var flag=0;
var flag1=0;
var total=0;
var player1;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
let gameWon=null;
var arr_huPlayer=[];
var arr_aiPlayer=[];
var win_path;
var p_tag=document.querySelector("#text");
var button=document.querySelector("button");
button.addEventListener('click',function turnClick(){
	 flag=0;
	 flag1=0;
	 total=0;	
	 gameWon=null;
})
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
		origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',function turnClick(){
			console.log(this.id);
			if(flag==0 && flag1==0 && typeof origBoard[this.id]=='number')
			{
				console.log(origBoard[this.id]+" Hello Guys");
				player1=huPlayer;
				flag=1;
				turn(this.id, player1);
			}
		    else if(flag==1 && flag1==0 && typeof origBoard[this.id]=='number'){
				player1=aiPlayer;
				flag=0;
				turn(this.id, player1);
			}
			
			
		});
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;	
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)	
	if (gameWon ) {
	   p_tag.textContent="RESULT= "+gameWon.player+" is Winner!";
	   for(var j=0;j<3;j++)
	   {
		   cells[winCombos[gameWon.ind][j]].style.backgroundColor = "red";
		   console.log(winCombos[gameWon.ind][j]);
	   }
		flag1=1;
	}
}

function checkWin(board, player) {
	let gameWon=null;
	var arr_huPlayer=[];
	var arr_aiPlayer=[];
	for(i=0;i<cells.length;i++)
	{
		if(origBoard[i] == huPlayer)
		{
			arr_huPlayer.push(i);
		}
	}
	for(i=0;i<cells.length;i++)
	{
		if(origBoard[i] == aiPlayer)
		{
			arr_aiPlayer.push(i);
		}
	}
	if(player==huPlayer)
	{
    	for(let i=0;i<8;i++)
		 {
			let count_a=0;
			console.log("Hello");
			for( let j=0;j<3;j++)
			{
				for(let k=0;k<arr_huPlayer.length;k++)
				{
					if(arr_huPlayer[k] == winCombos[i][j])
					{
						count_a++;
						if(count_a==3)
						{
							ind=i;
							gameWon = {ind: ind, player: player};
							break;
						}
					}
				}
			}	
				
	    }
	}
	
	if(player==aiPlayer)
	{
    	for(let i=0;i<8;i++)
		 {
			let count_a=0;
			let result=3;
			console.log("Hello");
			for( let j=0;j<3;j++)
			{
				for(let k=0;k<arr_aiPlayer.length;k++)
				{
					if(arr_aiPlayer[k] == winCombos[i][j])
					{
						count_a++;
						if(count_a==3)
						{
							ind=i;
							gameWon = {ind: ind, player: player};
							break;
						}
					}
				}
			}	
				
	    }
	}
	var total=0;
	for(var i=0;i<9;i++)
	{
		if(typeof origBoard[i]=='number')
		{
			total++;
		}
	}
	if(total==0)
	{
		p_tag.textContent="RESULT= TIED GAME!"		
	}
	return gameWon;
}