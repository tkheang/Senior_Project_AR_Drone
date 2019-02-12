var Cylon = require('cylon');

Cylon.robot({
    connections: {
        leapmotion: { adaptor: 'leapmotion' },
        ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
    },

    devices: {
        leapmotion: { driver: 'leapmotion', connection: 'leapmotion' },
        drone: { driver: 'ardrone', connection: 'ardrone' }
    },

    work: function (my) {
        my.leapmotion.on('frame', function (frame) {
            var hand = frame.hands[0];
            if (frame.hands.length > 0) {
                my.drone.takeoff();
            }
            else {
                console.log('LAND');
                my.drone.land();
            }       
            if (frame.valid && frame.hands.length > 0) {
                var hand = frame.hands[0];
                var elevation = hand.palmPosition[1];
                var upNormalized = ((elevation - 305) / 295);
                var downNormalized = (1 - ((elevation - 100) / 195));
                var roll = hand.roll() * (180 / 3.14);
                var pitch = hand.pitch() * (180 / 3.14);
                var yaw = hand.yaw() * (180 / 3.14);

                // to normalize position to 0-1 range: normalized_value = (x - min(x)) / (max(x) - min(x))
                var leftNormalized = (roll / 45);
                var rightNormalized = (Math.abs(roll) / 45)
                var forwardNormalized = (Math.abs(pitch) / 45)
                var backwardNormalized = (pitch / 45);
                var clockwiseNormalized = (yaw / 45);
                var counterClockwiseNormalized = (Math.abs(yaw) / 45);

                //if (elevation > 305 && elevation < 600) {
                //    console.log('UP ' + upNormalized);
                //    my.drone.up(upNormalized);
                //}
                //else if (elevation < 295 && elevation > 100) {
                //    console.log('DOWN ' + downNormalized);
                //    my.drone.down(downNormalized);
                //}
                //else {
                //    console.log('HOVER');
                //    my.drone.stop();
                //}

                //if (yaw > 20 && yaw < 45) {
                //    console.log('CLOCKWISE ' + clockwiseNormalized);
                //    my.drone.clockwise(clockwiseNormalized);
                //}
                //else if (yaw < -20 && yaw > -45) {
                //    console.log('COUNTERCLOCKWISE ' + counterClockwiseNormalized);
                //    my.drone.counterClockwise(counterClockwiseNormalized);
                //}
                //else {
                //    console.log('HOVER');
                //    my.drone.stop();
                //}

                if (roll > 5 && roll < 45 && pitch < 5 && pitch > -45) {
                    console.log('LEFT ' + leftNormalized);
                    console.log('FORWARD ' + forwardNormalized);
                    my.drone.left(leftNormalized) && my.drone.forward(forwardNormalized);
                    //if (elevation > 305 && elevation < 600) {
                    //    console.log('UP ' + upNormalized);
                    //    my.drone.up(upNormalized);
                    //}
                    //else if (elevation < 295 && elevation > 100) {
                    //    console.log('DOWN ' + downNormalized);
                    //    my.drone.down(downNormalized);
                    //}
                    //else {
                    //    console.log('HOVER');
                    //    my.drone.stop();
                    //}
                }
                else if (roll < 5 && roll > -45 && pitch < 5 && pitch > -45) {
                    console.log('RIGHT ' + rightNormalized);
                    console.log('FORWARD ' + forwardNormalized);
                    my.drone.right(rightNormalized) && my.drone.forward(forwardNormalized);
                    //if (elevation > 305 && elevation < 600) {
                    //    console.log('UP ' + upNormalized);
                    //    my.drone.up(upNormalized);
                    //}
                    //else if (elevation < 295 && elevation > 100) {
                    //    console.log('DOWN ' + downNormalized);
                    //    my.drone.down(downNormalized);
                    //}
                    //else {
                    //    console.log('HOVER');
                    //    my.drone.stop();
                    //}
                }
                else if (roll < 5 && roll > -45 && pitch > 5 && pitch < 45) {
                    console.log('RIGHT ' + rightNormalized);
                    console.log('BACKWARD ' + backwardNormalized);
                    my.drone.right(rightNormalized) && my.drone.back(backwardNormalized)
                    //if (elevation > 305 && elevation < 600) {
                    //    console.log('UP ' + upNormalized);
                    //    my.drone.up(upNormalized);
                    //}
                    //else if (elevation < 295 && elevation > 100) {
                    //    console.log('DOWN ' + downNormalized);
                    //    my.drone.down(downNormalized);
                    //}
                    //else {
                    //    console.log('HOVER');
                    //    my.drone.stop();
                    //}
                }
                else if (roll > 5 && roll < 45 && pitch > 5 && pitch < 45) {
                    console.log('LEFT ' + leftNormalized);
                    console.log('BACKWARD ' + backwardNormalized);
                    my.drone.left(leftNormalized) && my.drone.back(backwardNormalized);
                    //if (elevation > 305 && elevation < 600) {
                    //    console.log('UP ' + upNormalized);
                    //    my.drone.up(upNormalized);
                    //}
                    //else if (elevation < 295 && elevation > 100) {
                    //    console.log('DOWN ' + downNormalized);
                    //    my.drone.down(downNormalized);
                    //}
                    //else {
                    //    console.log('HOVER');
                    //    my.drone.stop();
                    //}
                }
                else {
                    console.log('HOVER');
                    my.drone.stop();
                }
                //console.log('LEFT ' + leftNormalized);
                //console.log('RIGHT ' + rightNormalized);
                //console.log('FORWARD ' + forwardNormalized);
                //console.log('BACKWARD ' + backwardNormalized);

                //my.drone.left(leftNormalized) && my.drone.right(rightNormalized) && my.drone.forward(forwardNormalized) && my.drone.back(backwardNormalized);
            }
        })
    }
}).start();