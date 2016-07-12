'use babel'

const languagePattern = /lang\s*=\s*"([^"]*)"/im

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    return [{
      grammarScopes: ['text.html.basic'],
      getLanguages: textEditor => {
        let languages = []
        textEditor.scan(languagePattern, ({match, stop}) => {
          languages.push(match[1])
          stop()
        })
        return languages
      },
      checkedScopes: {
        'text.html.basic': true,
        'constant.character.entity.html': false,
        'constant.other.inline-data.html': false,
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
        'source.smarty.embedded.html': false
      }
    }]
  },

  activate () {
    require('atom-package-deps').install('linter-spell-html')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  }
}
