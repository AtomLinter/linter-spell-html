'use babel'

import { CompositeDisposable } from 'atom'

const languagePattern = /lang\s*=\s*"([^"]*)"/im
const grammarScopes = [
  'text.html.basic',          // language-html
  'text.embedded.html.basic', // from language-asciidoc, language-gfm
  'embedded.text.html.basic'  // from language-markdown
]

export default {
  disposables: null,

  provideGrammar () {
    function checkComments () {
      return atom.config.get('linter-spell-html.checkComments')
    }

    return [{
      grammarScopes: grammarScopes,
      findLanguageTags: textEditor => {
        let languages = []
        textEditor.scan(languagePattern, ({match, stop}) => {
          languages.push(match[1])
          stop()
        })
        return languages
      },
      checkedScopes: {
        'comment.block.html': checkComments,
        'constant.character.entity.html': false,
        'constant.other.inline-data.html': false,
        'embedded.text.html.basic': true,
        'entity.name.tag.block.any.html': false,
        'entity.name.tag.doctype.html': false,
        'entity.name.tag.inline.any.html': false,
        'entity.name.tag.other.html': false,
        'entity.name.tag.script.html': false,
        'entity.name.tag.structure.any.html': false,
        'entity.name.tag.style.html': false,
        'entity.name.tag.xml.html': false,
        'entity.other.attribute-name.html': false,
        'entity.other.attribute-name.id.html': false,
        'meta.tag.sgml.doctype.html': false,
        'punctuation.definition.entity.html': false,
        'punctuation.definition.tag.html': false,
        'source.coffee.embedded.html': false,
        'source.css.embedded.html': false,
        'source.js.embedded.html': false,
        'source.python.embedded.html': false,
        'source.smarty.embedded.html': false,
        'text.embedded.html.basic': true,
        'text.html.basic': true
      }
    }]
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list')
    let a = new wordList.ConfigWordList({
      name: 'HTML',
      keyPath: 'linter-spell-html.words',
      grammarScopes: grammarScopes
    })
    this.disposables.add(a)
    return a.provideDictionary()
  },

  activate () {
    this.disposables = new CompositeDisposable()
    require('atom-package-deps').install('linter-spell-html')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
