module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    layout: 'byComponent',
                    install: true,
                    verbose: true,
                    cleanTargetDir: false
                }
            }
        },
        clean: {
            ctb:{
                src: ['wwwroot/Bulied/CTB/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.global.js']
            },
            ctb_before:{
                src: ['!wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.clickstream.js', 'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.facebook.js']
            },
            ctb_out: {
                src: ['wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/*.min.js', '!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.global.js']
            },
            ctb_out_before: {
                src: ['!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.clickstream.js', 'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.facebook.js']
            },
            ctb_ps: {
                src: ['wwwroot/Bulied/CTB/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.global.js']
            },
            ctb_ps_before: {
                src: ['wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.clickstream.js', 'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.facebook.js']
            },
            ctb_ps_out: {
                src: ['deploy/Jepun.Web.PS.Demo/Scripts/jepun/*.js', '!deploy/Jepun.Web.PS.Demo/Scripts/jepun/*.min.js', '!deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.global.js']
            },
            ctb_ps_out_before: {
                src: ['deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.clickstream.js', 'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.facebook.js']
            }
            
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: false,
                sourceMapIncludeSources: false
            },
            build: {
                src: 'js/**/*.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            },
            ctb: {

                    src: [
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.core.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.common.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.func.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.ui.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.datepicker.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.valid.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.clickstream.js',
                        'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.facebook.js',
                        '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js',
                        '!wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.global.js'
                    ],
                    dest: 'wwwroot/Bulied/CTB/Web/Scripts/jepun/<%= pkg.name %>.min.js'
            },
            ctb_glb: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Scripts/jepun',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Scripts/jepun'
                }]
            },
            ctb_app: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Scripts/Apps',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Scripts/Apps'
                }]
            },
            ctb_out: {
                src: [
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.core.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.common.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.func.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.ui.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.datepicker.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.valid.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.clickstream.js',
                    'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.facebook.js',
                    '!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/*.min.js',
                    '!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/jepun.global.js'
                ],
                dest: 'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/<%= pkg.name %>.min.js'
            },
            ctb_out_glb: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB.Out/Web/Scripts/jepun'
                }]
            },
            ctb_out_app: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB.Out/Web/Scripts/Apps',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB.Out/Web/Scripts/Apps'
                }]
            },
            ctb_ps: {
                src: [
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.core.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.common.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.func.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.ui.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.datepicker.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.valid.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.clickstream.js',
                    'wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.facebook.js',
                    '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js',
                    '!wwwroot/Bulied/CTB/Web/Scripts/jepun/jepun.global.js'
                ],
                dest: 'wwwroot/Bulied/CTB/Web/Scripts/jepun/<%= pkg.name %>.min.js'
            },
            ctb_glb_ps: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Scripts/jepun',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Scripts/jepun'
                }]
            },
            ctb_ps_app: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Scripts/Apps',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Scripts/Apps'
                }]
            },
            ctb_ps_out: {
                src: [
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.core.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.common.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.func.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.ui.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.datepicker.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.valid.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.clickstream.js',
                    'deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.facebook.js',
                    '!deploy/Jepun.Web.PS.Demo/Scripts/jepun/*.min.js',
                    '!deploy/Jepun.Web.PS.Demo/Scripts/jepun/jepun.global.js'
                ],
                dest: 'deploy/Jepun.Web.PS.Demo/Scripts/jepun/<%= pkg.name %>.min.js'
            },
            ctb_ps_out_glb: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'deploy/Jepun.Web.PS.Demo/Scripts/jepun',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'deploy/Jepun.Web.PS.Demo/Scripts/jepun'
                }]
            },
            ctb_ps_out_app: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'deploy/Jepun.Web.PS.Demo/Scripts/Apps',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'deploy/Jepun.Web.PS.Demo/Scripts/Apps'
                }]
            }
        },
        cssmin: {
            //文件輸出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代碼
                beautify: {
                    //中文ascii化，非常有用！防止中文亂碼的神配置
                    ascii_only: true
                }
            },
            compress: {
                files: {
                    'dist/css/<%= pkg.name %>.min.css': [
                    'css/**/*.css'
                    ]
                }
            },
            ctb: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Content',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/site.css', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Content'
                }]
            },
            ctb_out: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB.Out/Web/Content',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/site.css', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB.Out/Web/Content'
                }]
            },
            ctb_ps: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'wwwroot/Bulied/CTB/Web/Content',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/site.css', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'wwwroot/Bulied/CTB/Web/Content'
                }]
            },
            ctb_ps_out: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'deploy/Jepun.Web.PS.Demo/Content',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['**/site.css', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'deploy/Jepun.Web.PS.Demo/Content'
                }]
            }
        },
        copy: {
            js: {
                expand: true,
                cwd: 'dest/js/',
                src: '*',
                dest: 'web/Scripts/'
            },
            css: {
                expand: true,
                cwd: 'dest/css/',
                src: '*',
                dest: 'web/Content/'
            }
        },
        jshint: {
            options: {
                'evil': true, // eval
                'loopfunc': true, //false: don't make functions within a loop
                'forin':false,
                'curly': true,//大括號包裹: true		
                'eqnull': true,
                //'strict': true,			
                'eqeqeq': true,//對于簡單類型，使用===和!==，而不是==和!=  : true			
                'newcap': true,//對于首字母大寫的函數（聲明的類），強制使用new  : true			
                'noarg': false,//禁用arguments.caller和arguments.callee  : true			
                'sub': true,//對于屬性使用aaa.bbb而不是aaa['bbb']	: true		 
                'undef': true,//查找所有未定義變量			: true
                'unused': false,
                'boss': true,//查找類似与if(a = 0)這樣的代碼		: true	
                'node': false,//指定運行環境為node.js   : true
                'browser': true,
                "laxcomma": true,
                'globals': {
                    '$': false,
                    'jQuery': false,
                    'define':false,
                    'console': true,
                    'module': true,
                    'GlbEnv': true,
                    'jCom': true,
                    'jCore': true,
                    'jFun': true,
                    'ActiveXObject': true,
                    'GlbAlertModal': true,
                    'GlbUserRight': true,
                    'GlbLabelTxt': true,
                    'GlbSetting': true,
                    'localArgs': true,
                    'GlbAppModal': true,
                    'GlbEventType': true,
                    'GlbHomeMain': true,
                    'GlbFormLayout': true,
                    'GlbChkAreaExpanded': true,
                    'GlbAppModalSub': true,
                    'GlbLoadingModal': true,
                    'GlbFfunName' :true,
                    'GlbAppendSubFunName': true,
                    'GlbsystemTime':true,
                    //glbFUN
                    'glbLoading':true,
                    'glbChkFundRisk':true,
                    'glbPrintReport': true,
                    'glbDownloadReport': true,
                    //圖表
                    'Highcharts': true,
                    'Chart':true,
                    //PS 事件
                    'initButton': true,
                    'getRoleFlowsUrl': true,

                    'FB':true
                }
            },
            //all: ['src/**/*.js']
            files: ['Gruntfile.js', 'jshint/all/**/*.js'],
            single: ['Gruntfile.js', 'jshint/single/**/*.js'],
            ctb: ['wwwroot/Bulied/CTB/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js'],
            ctb_app: ['wwwroot/Bulied/CTB/Web/Scripts/Apps/*.js'],
            ctb_out: ['wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB.Out/Web/Scripts/jepun/*.min.js'],
            ctb_out_app: ['wwwroot/Bulied/CTB.Out/Web/Scripts/Apps/*.js'],
            ctb_ps: ['wwwroot/Bulied/CTB/Web/Scripts/jepun/*.js', '!wwwroot/Bulied/CTB/Web/Scripts/jepun/*.min.js'],
            ctb_ps_app: ['wwwroot/Bulied/CTB/Web/Scripts/Apps/*.js'],
            ctb_ps_out: ['deploy/Jepun.Web.PS.Demo/Scripts/jepun/*.js', '!deploy/Jepun.Web.PS.Demo/Scripts/jepun/*.min.js'],
            ctb_ps_out_app: ['deploy/Jepun.Web.PS.Demo/Scripts/Apps/*.js']
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        jsdoc: {
            dist: {
                src: ['js/single/**/*.js'],
                options: {
                    //destination: 'doc',
                    //tutorials: 'doc/Tutorials'
                }
            },
            ctb: {
                src: ['wwwroot/Doc/CTB/JavaScripts/*.js', '!wwwroot/Doc/CTB/JavaScripts/*.min.js'],
                dest: 'wwwroot/Doc/CTB/Scripts'
            }
        }
    });
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln('');
        grunt.log.writeln(target + ':' + filepath + ' has ' + action);
    });

    grunt.registerTask('jsDoc-ctb', ['jsdoc:ctb']);

    grunt.registerTask('release-ctb', ['clean:ctb_before', 'jshint:ctb', 'uglify:ctb', 'uglify:ctb_glb', 'jshint:ctb_app', 'uglify:ctb_app', 'clean:ctb', 'cssmin:ctb']);
    grunt.registerTask('release-ctb-HaveSrcJs', ['clean:ctb_before', 'jshint:ctb', 'uglify:ctb', 'cssmin:ctb']);

    grunt.registerTask('release-ctb-out', ['clean:ctb_out_before', 'jshint:ctb_out', 'uglify:ctb_out', 'uglify:ctb_out_glb', 'jshint:ctb_out_app', 'uglify:ctb_out_app', 'clean:ctb_out', 'cssmin:ctb_out']);
    grunt.registerTask('release-ctb-HaveSrcJs', ['clean:ctb_out_before', 'jshint:ctb_out', 'uglify:ctb_out', 'cssmin:ctb_out']);

    grunt.registerTask('release-ctb-ps', ['clean:ctb_ps_before', 'jshint:ctb_ps', 'uglify:ctb_ps', 'uglify:ctb_glb_ps', 'jshint:ctb_ps_app', 'uglify:ctb_ps_app', 'clean:ctb_ps', 'cssmin:ctb_ps']);

    grunt.registerTask('release-ctb-ps-out', ['clean:ctb_ps_out_before', 'jshint:ctb_ps_out', 'uglify:ctb_ps_out', 'uglify:ctb_ps_out_glb', 'jshint:ctb_ps_out_app', 'uglify:ctb_ps_out_app', 'clean:ctb_ps_out', 'cssmin:ctb_ps_out']);
};