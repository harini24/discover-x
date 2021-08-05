const API = {
    GetWelcomeText: async message => {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (message === "hi") resolve("Welcome to Digital Human chatbot!");
                else resolve("echo : " + message);
            }, 2000);
        });
    },
    GetChatbotResponse: async message => {
        const resp = await fetch('http://192.168.2.3:8085/df', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ text: message })
        })

        const content = await resp.json();
        console.log(content)

        return content.text
    }
};

export default API;
