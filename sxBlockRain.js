define([
    "qlik", 
    "jquery",
    "text!./blockrainjs/blockrain.jquery.js",
    "text!./blockrainjs/blockrain.css",
    "text!./sxBlockrain.css"
],
function ( 
        qlik,
        $,
        blockrainJs,
        blockrainCss,
        sxBlockrainCss
        ) {
    'use strict';
    $("<style>").html(blockrainCss).appendTo("head");
    $("<style>").html(sxBlockrainCss).appendTo("head");
    $("<script>").html(blockrainJs).appendTo("head");
    return {
        definition: {
            type: "items",
            component: "accordion",
            items: {
                settings: {
                    uses: "settings",
                    items: {
                        scOptions: {
                            type: "items",
                            label: "Game options",
                            items: {
                                sxDifficulty: {
                                    ref: "sxDifficulty",
                                    type: "string",
                                    component: "dropdown",
                                    label: "Difficulty",
                                    options: [
                                        {
                                            value: "normal",
                                            label: "Normal"
                                        }, 
                                        {
                                            value: "nice",
                                            label: "Nice"
                                        },
                                        {
                                            value: "evil",
                                            label: "Evil"
                                        }
                                    ],
                                    defaultValue: "normal"
                                },
                                sxSpeed: {
                                        type: "number",
                                        component: "slider",
                                        label: "Speed of the game",
                                        ref: "sxSpeed",
                                        min: 10,
                                        max: 100,
                                        step: 10,
                                        defaultValue: 20
                                },
                                sxTheme: {
                                    ref: "sxTheme",
                                    type: "string",
                                    component: "dropdown",
                                    label: "Theme",
                                    options: [
                                        {
                                            value: "candy",
                                            label: "Candy"
                                        }, 
                                        {
                                            value: "modern",
                                            label: "Modern"
                                        },
                                        {
                                            value: "retro",
                                            label: "Retro"
                                        },
                                        {
                                            value: "vim",
                                            label: "Vim"
                                        },
                                        {
                                            value: "monochrome",
                                            label: "Monochrome"
                                        },
                                        {
                                            value: "gameboy",
                                            label: "Gameboy"
                                        },
                                        {
                                            value: "aerolab",
                                            label: "Aerolab"
                                        }
                                    ],
                                    defaultValue: "candy"
                                },
                                sxPlayText: {
                                    ref: "sxPlayText",
                                    translation: "Game title",
                                    type: "string",
                                    defaultValue: "Let\'s play some Tetris"
                                },
                                sxPlayButtonText: {
                                    ref: "sxPlayButtonText",
                                    translation: "Play button text",
                                    type: "string",
                                    defaultValue: "Play"
                                },
                                sxGameOverText: {
                                    ref: "sxGameOverText",
                                    translation: "Game over text",
                                    type: "string",
                                    defaultValue: "Game Over"
                                },
                                sxRestartButtonText: {
                                    ref: "sxRestartButtonText",
                                    translation: "Restart button text",
                                    type: "string",
                                    defaultValue: "Play Again"
                                },
                                sxScoreText: {
                                    ref: "sxScoreText",
                                    translation: "Score text",
                                    type: "string",
                                    defaultValue: "Score"
                                }
                            }
                        }
                    }
                }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
        paint: function ($element, layout) {
            var options = {
                autoplay: false, // Let a bot play the game
                autoplayRestart: true, // Restart the game automatically once a bot loses
                showFieldOnStart: true, // Show a bunch of random blocks on the start screen (it looks nice)
                theme: layout.sxTheme, // The theme name or a theme object
                blockWidth: 10, // How many blocks wide the field is (The standard is 10 blocks)
                autoBlockWidth: true, // The blockWidth is dinamically calculated based on the autoBlockSize. Disabled blockWidth. Useful for responsive backgrounds
                autoBlockSize: 24, // The max size of a block for autowidth mode
                difficulty: layout.sxDifficulty, // Difficulty (normal|nice|evil).
                speed: layout.sxSpeed, // The speed of the game. The higher, the faster the pieces go.
                controls: true,

                // Copy
                playText: layout.sxPlayText,
                playButtonText: layout.sxPlayButtonText,
                gameOverText: layout.sxGameOverText,
                restartButtonText: layout.sxRestartButtonText,
                scoreText: layout.sxScoreText,

                // Basic Callbacks
                onStart: function(){},
                onRestart: function(){},
                onGameOver: function(score){},

                // When a line is made. Returns the number of lines, score assigned and total score
                onLine: function(lines, scoreIncrement, score){}
            };
            var html = '<div id="sxBlockRain_'+layout.qInfo.qId+'" class="game" style="width:100%; height:93%;"></div>';
            html += '<div class="scBlockRain_controls"><button id="sxBlockRain_'+layout.qInfo.qId+'_pauseButton">Pause</button><button id="sxBlockRain_'+layout.qInfo.qId+'_resumeButton" style="display: none;">Resume</button><button id="sxBlockRain_'+layout.qInfo.qId+'_quitButton">Quit</button></div>';           
            $element.html(html);
            $('#sxBlockRain_'+layout.qInfo.qId).blockrain(options);

            // Custom controls triggers
            $('#sxBlockRain_'+layout.qInfo.qId+'_pauseButton').click(function() {
                $('#sxBlockRain_'+layout.qInfo.qId).blockrain('pause');
                $(this).hide();
                $('#sxBlockRain_'+layout.qInfo.qId+'_resumeButton').show();
            });
            $('#sxBlockRain_'+layout.qInfo.qId+'_resumeButton').click(function() {
                $('#sxBlockRain_'+layout.qInfo.qId).blockrain('resume');
                $(this).hide();
                $('#sxBlockRain_'+layout.qInfo.qId+'_pauseButton').show();
            });
            $('#sxBlockRain_'+layout.qInfo.qId+'_quitButton').click(function() {
                $('#sxBlockRain_'+layout.qInfo.qId).blockrain('resume');
                $('#sxBlockRain_'+layout.qInfo.qId+'_resumeButton').hide();
                $('#sxBlockRain_'+layout.qInfo.qId+'_pauseButton').show();
                $('#sxBlockRain_'+layout.qInfo.qId).blockrain('gameover');
            });
        }
    };

});

