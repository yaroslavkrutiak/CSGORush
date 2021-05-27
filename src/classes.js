export default class Block {
    constructor(content) {
        this.arr = [];
        console.log(content[0])
        console.log(content)

        for (let j = 0; j < content.length; j++) {
            if (j === 4) break;
            this.arr[j] = {
                date: content[j].time,
                event: {
                    name: content[j].event.name,
                    crest: content[j].event.crest
                },
                teams: {
                    team1: {
                        name: content[j].teams[0].name,
                        crest: content[j].teams[0].crest
                    },
                    team2: {
                        name: content[j].teams[1].name,
                        crest: content[j].teams[1].crest
                    }
                },
                map: content[j].map
            };
        }
    }


    createElements() {
        let html = document.querySelector(".lowerBgRectangle");
        let date, day, map, time, fullDate, temp;
        console.log(html)


        date = new Date(this.arr[0].date).toISOString().slice(0, 10);
        day = getWeekDay(new Date(this.arr[0].date));
        html.innerHTML += `<div class="matchDayHeadline"><label id="date">${day}    ${date}</label></div>`;
        console.log(html)
        for (let i = 0; i < this.arr.length; i++) {
            try {
                temp = this.arr[i];
                fullDate = new Date(temp.date);
                date = fullDate.toISOString().slice(0, 10);
                if (fullDate.getUTCMinutes() == '0')
                    time = fullDate.getUTCHours() + ':0' + fullDate.getUTCMinutes();
                else
                    time = fullDate.getUTCHours() + ':' + fullDate.getUTCMinutes();

                map = temp.map

                html.innerHTML += `   
                    <container class="upcomingMatch" data-zonedgrouping-entry-unix="1620820800000">
                        <container
                           class="match a-reset">
                            <div class="matchInfo">
                                <div class="matchTime" data-time-format="HH:mm" data-unix="1620820800000">${time}</div>
                                <div class="matchMeta">${temp.map}</div>
                            </div>
                            <div class="matchTeams text-ellipsis">
                                <div class="matchTeam team1">
                                    <div class="matchTeamLogoContainer"><img alt="${temp.teams.team1.name}"
                                                                             class="matchTeamLogo"
                                                                             title="${temp.teams.team1.name}"
                                                                             src="${temp.teams.team1.crest}">
                                    </div>
                                    <div class="matchTeamName text-ellipsis">${temp.teams.team1.name}</div>
                                </div>
                                <div class="matchTeam team2">
                                    <div class="matchTeamLogoContainer"><img alt="${temp.teams.team2.name}" class="matchTeamLogo"
                                                                             title="${temp.teams.team2.name}"
                                                                             src="${temp.teams.team2.crest}">
                                    </div>
                                    <div class="matchTeamName text-ellipsis">${temp.teams.team2.name}</div>
                                </div>
                            </div>
                            <div class="matchEvent">
                                <div class="matchEventLogoContainer"><img alt="${temp.event.name}"
                                                                          class="matchEventLogo"
                                                                          title="${temp.event.name}"
                                                                          src="${temp.event.crest}">
                                </div>
                                <div class="matchEventName gtSmartphone-only">${temp.event.name}</div>
                            </div>
                        </container></container>`;
            } catch (e) {
                console.error(e);
            }
        }
    }

    post() {
        document.querySelector(".lowerBgRectangle").innerHTML += `        <footer>
            <a>© All Rights Reserved. CSGORush.com</a>
        </footer>`;

    }

    postContent() {
        this.createElements();
        this.post();
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
}

function getWeekDay(fullDate){
    let day;
    switch (fullDate.getDay()){
        case 0: day='Mon';break;
        case 1: day='Tue';break;
        case 2: day='Wed';break;
        case 3: day='Thu';break;
        case 4: day='Fri';break;
        case 5: day='Sat';break;
        case 6: day='Sun';break;
    }
    return day;
}