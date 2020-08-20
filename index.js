let long; 
let lat; 
let tempDesc = document.querySelector('.temp-desc');
let tempDeg = document.querySelector('.temp-deg');
let locTm = document.querySelector('.loc-tm');
let iconImg = document.querySelector('.icon-img')
let tempSec = document.querySelector('.temp-sec')
let tempSpan = document.querySelector('.temp-sec span')

const todayWeather = () =>{
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(pos=>{
		long = pos.coords.longitude;
		lat = pos.coords.latitude;
		const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.api_key}`
		
		fetch(api)
			.then(response => response.json())
				.then(data =>{
					const {country} = data.sys;
					const {description,icon} = data.weather[0];
					let {temp} = data.main;
					temp = (temp - 273.15);
					temp = temp.toFixed(1);

					//Set Dom elements from the API data
					locTm.textContent = country;
					tempDesc.textContent = description;
					tempDeg.textContent = temp;
					iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
					
					document.querySelector('.weather-input').classList.add("hidden");
					document.querySelector('.weather-display').classList.remove('hidden');
					document.querySelector('#current-weather').classList.add('hidden');
					
					let button = document.querySelector('#toggle')
					button.value = "Reset";
					button.onclick = input;
				})
		})
	}
}

const weather = () =>{
	// Get longitude and latitude from input
	long = Number(document.querySelector('#long').value);
	lat = Number(document.querySelector('#lat').value);

	const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.api_key}`
		
	fetch(api)
		.then(response => response.json())
			.then(data =>{
				console.log(data);
				let {country} = data.sys;
				if(country==undefined){
					country = "Country"
				}
				let {description,icon} = data.weather[0];
				let {temp} = data.main;
				temp = (temp - 273.15);
				temp = temp.toFixed(1);

				//Set Dom elements from the API data
				locTm.textContent = country;
				tempDesc.textContent = description;
				tempDeg.textContent = temp;
				iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
			})
			document.querySelector('.weather-input').classList.add("hidden");
			document.querySelector('.weather-display').classList.remove('hidden');
			document.querySelector('#current-weather').classList.add('hidden');
			
			let button = document.querySelector('#toggle')
			button.value = "Reset";
			button.onclick = input;
}

	const input = () =>{
		document.querySelector('.weather-input').classList.remove("hidden");
		document.querySelector('.weather-display').classList.add('hidden');
		document.querySelector('#current-weather').classList.remove('hidden');

		let button = document.querySelector('#toggle')
		button.value = "Submit";
		button.onclick = weather;
	}

// Change Temperature to Fahrenheit/Celsius
tempSec.addEventListener('click', () =>{
	if(tempSpan.textContent === "F"){
		let temp = Number(tempDeg.textContent);
		temp = (temp-32)*5/9;
		tempDeg.textContent = temp.toFixed(1);
		tempSpan.textContent = "C";
	}else{
		let temp = Number(tempDeg.textContent);
		temp = temp*9/5 + 32;
		tempDeg.textContent = temp.toFixed(1);
		tempSpan.textContent = "F";
	}
})
