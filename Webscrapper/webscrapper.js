const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const https = require("https");


const { v4: uuidv4 } = require("uuid");


function saveImage(url,path) {

	var localPath = fs.createWriteStream(path)
	var urlPath = url

	var request = https.get(urlPath,function (response){
		console.log(response)
		response.pipe(localPath)
	})
}

const CATEGORIES = [
	{
		listingLink: "https://hebbarskitchen.com/recipes/breakfast-recipes/",
		tag: "Breakfast",
		page: 1,
	},
];

function intentionalDelay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(ms);
		}, ms);
	});
}

async function getRecipeData(url, tag) {
	//console.log(url, tag);
	const page = await await axios.request({
		method: "GET",
		url: url,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
		},
	});
	const $ = cheerio.load(page.data);


let prepTimeHours = $(".wprm-recipe-prep_time-hours")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data ? parseInt($(".wprm-recipe-prep_time-hours")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data) * 60 : 0;

let prepTimeMins =  $(".wprm-recipe-prep_time-minutes")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data ? parseInt($(".wprm-recipe-prep_time-minutes")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data) : 0;

let prepTime = prepTimeHours + prepTimeMins
	

let cookTimeHours = $(".wprm-recipe-cook_time-hours")['0']?.children?.filter( el =>
											el.type === "text"
											)[0]?.data ? parseInt($(".wprm-recipe-cook_time-hours")['0']?.children?.filter( el =>
												el.type === "text"
										)[0]?.data) * 60 : 0

let cookTimeMins = $(".wprm-recipe-cook_time-minutes")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data ? parseInt($(".wprm-recipe-cook_time-minutes")['0']?.children?.filter( el =>
	el.type === "text"
)[0]?.data) : 0

let totalTime = cookTimeHours+cookTimeMins


let ingredient = []

let  ingredientUnit= $(".wprm-recipe-ingredient").map((i,ele)=>{
   
	let qty = $(ele).find('.wprm-recipe-ingredient-amount').text()
	let unit = $(ele).find('.wprm-recipe-ingredient-unit').text()
	let name = $(ele).find('.wprm-recipe-ingredient-name').text()
	let item = {quantity:qty,unit:unit,name:name}
  return item;})



for (let i =0 ;i<ingredientUnit.length;i++){
		ingredient.push(ingredientUnit[i])
	}


let instruction = []


let instructionArray = $(".wprm-recipe-instruction-text").map((i,ele)=>{
	return ele?.children?.filter( el =>
		el.type === "text"
	)[0]?.data })
	

	for (let i=0;i<instructionArray.length;i++){

		instruction.push(instructionArray[i])
	}
	//console.log(instruction)


	let nutritionLable = $(".wprm-nutrition-label-text-nutrition-label").map((i,ele)=>{
		return ele?.children?.filter( el =>
			el.type === "text"
		)[0]?.data })

	let nutritionValue = $(".wprm-nutrition-label-text-nutrition-value").map((i,ele)=>{
		return ele?.children?.filter( el =>
			el.type === "text"
		)[0]?.data })

		let nutritionUnit = $(".wprm-nutrition-label-text-nutrition-unit").map((i,ele)=>{
			return ele?.children?.filter( el =>
				el.type === "text"
			)[0]?.data })

	let nutrition = []

	for(let i=0;i<nutritionLable.length;i++){
		let item = {
			label:nutritionLable[i],
			value:nutritionValue[i],
			unit:nutritionUnit[i]
		}

		nutrition.push(item)
	}


	//console.log(nutrition)
		


			




	const recipe = {
		uuid: uuidv4(),
		name: $(".wprm-recipe-name").text(),
		preperationTime: prepTime,
		cookTime: totalTime,
		ingredients: ingredient,
		instructions:instruction,
		nutritions:nutrition
	};
	console.log(recipe);

	console.log("-----------------------------------------------------------------------");
	return null;
}

async function startScraping(listingPageUrl, tag, pages) {
	let recipe = [];
	for (let i = 1; i <= pages; i++) {
		
		await intentionalDelay(2000);
		let completeUrl = listingPageUrl + "page/" + i.toString()

		const page = await await axios.request({
			method: "GET",
			url: completeUrl,
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
			},
		});
		const $ = cheerio.load(page.data);
		const listArray = $(".td-container")
			.find(".td-module-title > a")
			.map(async (i, element) => {
				await intentionalDelay(2000);
				//console.log(element.attribs.href);
				return await getRecipeData(element.attribs.href, tag);
			});
		// console.log(listArray);
	}
}

//startScraping(CATEGORIES[0].listingLink, CATEGORIES[0].tag, CATEGORIES[0].page);

saveImage("https://hebbarskitchen.com/wp-content/uploads/2023/08/Ottu-Shavige-Recipe-Instant-Akki-Vattu-Shavige-Karnataka-Style-2-768x512.jpeg","./image.png")


// https://hebbarskitchen.com/instant-idli-recipe-no-urad-dal-rice/
// https://hebbarskitchen.com/apple-pancakes-recipe-easy-healthy/
// https://hebbarskitchen.com/instant-rava-dosa-recipe-suji-ka-dosa/
// https://hebbarskitchen.com/roti-wrap-recipe-leftover-chapati-wrap/
// https://hebbarskitchen.com/eggless-healthy-banana-pancake-recipe/
// https://hebbarskitchen.com/besan-chilla-recipe-besan-ka-cheela/
// https://hebbarskitchen.com/palak-chilla-recipe-spinach-cheela/
// https://hebbarskitchen.com/ragi-malt-recipe-ragi-porridge-recipe/
// https://hebbarskitchen.com/poha-dosa-recipe-soft-sponge-aval-dosa/
// https://hebbarskitchen.com/instant-appe-recipe-rava-kuzhi-paniyaram/






// https://hebbarskitchen.com/vrat-ka-khana-recipe-vrat-ka-nashta/
// https://hebbarskitchen.com/ragi-upma-recipe-weight-loss/
// https://hebbarskitchen.com/instant-crispy-spinach-palak-dosa-recipe/
// https://hebbarskitchen.com/poha-nasta-recipe-healthy-steamed-vada/
// https://hebbarskitchen.com/tomato-rice-recipe-thakali-rice/
// https://hebbarskitchen.com/wheat-rava-dosa-recipe-bansi-rava-dosa/
// https://hebbarskitchen.com/instant-semiya-dosa-recipe-crisp-tasty/
// https://hebbarskitchen.com/pulihora-recipe-chintapandu-pulihora/
// https://hebbarskitchen.com/chana-dosa-recipe-black-chickpeas-dosa/
// https://hebbarskitchen.com/green-moong-sprouts-dosa-recipe/
