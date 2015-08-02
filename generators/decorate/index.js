'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var fs = require('fs');

var generator;

function info(msg) {
  console.log(msg);
}

function command(msg) {
  console.log('  $ ' + msg);
}

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.option('ts'); // typescript
    this.option('vs'); // visual studio
    this.option('fa'); // font awesome
    this.option('cli'); // aurelia CLI
    this.option('plugins');

    this.props = {};
    this.props.vs = this.options.vs;
    this.props.ts = this.options.ts;
    this.props.fa = this.options.fa;
    this.props.plugins = this.options.plugins;

    generator = this;
  },

  initializing: function() {
  },

  prompting: function() {
    var done = this.async();
    var prompts = [{
      type: 'confirm',
      name: 'installStyles',
      message: 'Install Styles',
      default: true
    }, {
      type: 'confirm',
      name: 'installCLI',
      message: 'Install Aurelia CLI',
      default: true
    }];

    var pluginsPrompt ={
      type: 'confirm',
      name: 'installPlugins',
      message: 'Install Aurelia Plugins',
      default: false
    };

    // should not prompt to install
    // if options are passed to force install
    var typeScriptPrompt = {
      type: 'confirm',
      name: 'installTypeScript',
      message: 'Install TypeScript',
      default: false
    };

    var vsPrompt = {
      type: 'confirm',
      name: 'visualStudio',
      message: 'Visual Studio',
      default: false
    };

    var layoutPrompt = {
      type: 'confirm',
      name: 'installLayout',
      message: 'Install UI Frameworks',
      default: true
    };

    if (!this.props.vs) {
      prompts.push(vsPrompt);
    }

    if (!this.props.plugins) {
      prompts.push(pluginsPrompt);
    }

    if (!this.props.ts) {
      prompts.push(typeScriptPrompt);
    }

    if (!this.props.uiFramework) {
      prompts.push(layoutPrompt);
    }

    // info('Install Aurelia CLI:');

    this.prompt(prompts, function(answers) {

      this.installStyles = answers.installStyles;
      this.installLayout = answers.installLayout || this.props.uiFramework;
      this.installCLI = answers.installCLI || this.props.cli;
      this.installPlugins = answers.installPlugins || this.props.plugins;
      this.installTypeScript = answers.installTypeScript || this.props.ts;
      // this.config.save();

      done();
    }.bind(this));
  },

  end: function() {
    if (this.installStyles) {
      this.composeWith('aurelia-ts:styles', {
        options: {
          styleLang: this.props.styleLang,
          sass: this.options.sass,
          stylus: this.options.stylus
        }
      });
    }

    if (this.installTypeScript) {
      this.composeWith('aurelia-ts:typescript', {
        options: {
          cssFrameworks: this.cssFrameworks,
          githubAccount: this.githubAccount,
          authorName: this.authorName,
          authorEmail: this.authorEmail,
          appDesc: this.appDesc,
          appName: this.appName
        }
      });
    }

    if (this.installLayout) {
      this.composeWith('aurelia-ts:layout', {
        options: {
          appTitle: this.appTitle,
          appDesc: this.appDesc,
          ui: this.options.ui,
          fa: this.options.fa
        }
      });
    }

    if (this.installPlugins) {
      this.composeWith('aurelia-ts:plugins', {
        options: {
          bootstrap: this.bootstrap
        }
      });
    }

    if (this.installCLI) {
      this.composeWith('aurelia-ts:cli', {
        options: {}
      });
    }

    this.composeWith('aurelia-ts:state', {
      options: {}
    });
  }
});
