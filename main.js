var status_song1 = false;
var status_song2 = false;
var right_wrist_score = 0;
var left_wrist_score = 0;
var left_wrist_x = 0;
var left_wrist_y = 0;
var right_wrist_x = 0;
var right_wrist_y = 0;

function preload(){
    harry_song = loadSound("harry.mp3");
    peter_song = loadSound("peter.mp3");
}

function setup(){
    canvas = createCanvas(700, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    background("white");
    image(video, 0, 0, 700, 500);
    stroke("red");
    fill("red");
    if(harry_song.isPlaying()){
        status_song1 = true;
    }else{
        status_song1 = false;
    }

    if(peter_song.isPlaying()){
        status_song2 = true;
    }else{
        status_song2 = false;
    }

    if(left_wrist_score > 0.2){
        harry_song.stop();
        circle(left_wrist_x, left_wrist_y, 20);
        if(status_song1 == false){
        peter_song.play();
        console.log("peter");
        document.getElementById("song").innerHTML = "Peter Pan Theme Song";
        }

    }
    if(right_wrist_score > 0.2){
        peter_song.stop();
        circle(right_wrist_x, right_wrist_y, 20);
        if(status_song2 == false){
        harry_song.play();
        console.log("harry");
        document.getElementById("song").innerHTML = "Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet is Initialised.");
}

function gotPoses(result){
    if(result.length>0){
        console.log(result);
        left_wrist_score = result[0].pose.keypoints[9].score;
        right_wrist_score = result[0].pose.keypoints[10].score;
        left_wrist_x = result[0].pose.leftWrist.x;
        left_wrist_y = result[0].pose.leftWrist.y;
        right_wrist_x = result[0].pose.rightWrist.x;
        right_wrist_y = result[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+ left_wrist_x +", Left Wrist Y = "+ left_wrist_x  +", Right Wrist X = "+ right_wrist_x +", Right wrist Y = "+ right_wrist_y +", Left wrist score = "+ left_wrist_score +".");
    }
}