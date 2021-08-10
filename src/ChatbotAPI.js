
const API = {
    GetWelcomeText: async message => {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {



                if (message === "hi") resolve("Welcome to Rep Assist Bot!");
                else resolve("echo : " + message);
            }, 2000);
        });
    },
    GetChatbotResponse: async message => {
        const resp = await fetch('http://45.76.50.120:8080/sendmessage', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ message: message, to: '8668020762' })
        })

        const content = await resp.json();
        console.log(content)

        return content.text
    }
};

export default API;
