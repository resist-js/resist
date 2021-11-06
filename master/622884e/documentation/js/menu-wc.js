'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">resist documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Server.html" data-type="entity-link" >Server</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerPlugin.html" data-type="entity-link" >ServerPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerPlugins.html" data-type="entity-link" >ServerPlugins</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerSettings.html" data-type="entity-link" >ServerSettings</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IBook.html" data-type="entity-link" >IBook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBook-1.html" data-type="entity-link" >IBook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookFeatureFlags.html" data-type="entity-link" >IBookFeatureFlags</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookMetrics.html" data-type="entity-link" >IBookMetrics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookMetricsElastic.html" data-type="entity-link" >IBookMetricsElastic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookMetricsUser.html" data-type="entity-link" >IBookMetricsUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookServer.html" data-type="entity-link" >IBookServer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookServerSettings.html" data-type="entity-link" >IBookServerSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookStorybook.html" data-type="entity-link" >IBookStorybook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHandler.html" data-type="entity-link" >IHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHandler-1.html" data-type="entity-link" >IHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHeader.html" data-type="entity-link" >IHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRedirects.html" data-type="entity-link" >IRedirects</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRewriteHandler.html" data-type="entity-link" >IRewriteHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRewrites.html" data-type="entity-link" >IRewrites</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServer.html" data-type="entity-link" >IServer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerPlugin.html" data-type="entity-link" >IServerPlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerPluginRecord.html" data-type="entity-link" >IServerPluginRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerPlugins.html" data-type="entity-link" >IServerPlugins</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerSettings.html" data-type="entity-link" >IServerSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerSettingsHTTP.html" data-type="entity-link" >IServerSettingsHTTP</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});