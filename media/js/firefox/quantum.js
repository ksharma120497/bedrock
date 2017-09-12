/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function (Mozilla, Waypoint) {
    'use strict';

    var supportsMatchMedia = typeof window.matchMedia !== 'undefined';
    var $slideShow = $('.feature-carousel');
    var $signUp = $('.button.sign-up');
    var stickyFooterWaypoint;
    var endPageWaypoint;

    $signUp.attr('role', 'button').on('click', openNewsletterModal);

    function openNewsletterModal(e) {
        e.preventDefault();

        Mozilla.Modal.createModal(this, $('.newsletter-modal'));
    }

    function initSlideShow() {
        $slideShow.cycle({
            fx: 'scrollHorz',
            log: false,
            slides: '> li',
            speed: 620,
            prev: '.feature-carousel-previous',
            next: '.feature-carousel-next',
        });

        $slideShow.cycle('pause');
    }

    initSlideShow();

    function initMediaQuery() {
        var queryWide;

        if (!supportsMatchMedia) {
            return;
        }

        queryWide = matchMedia('(min-width: 1000px)');

        if (queryWide.matches) {
            initStickyFooter();
        }

        queryWide.addListener(function(mq) {
            if (mq.matches) {
                initStickyFooter();
            } else {
                destroyStickyFooter();
            }
        });
    }

    function initStickyFooter() {
        stickyFooterWaypoint = new Waypoint.Sticky({
            element: $('.sticky-footer'),
            offset: 'bottom-in-view'
        });
    }

    function destroyStickyFooter() {
        if (stickyFooterWaypoint) {
            stickyFooterWaypoint.destroy();
        }
    }

    initMediaQuery();

})(window.Mozilla, window.Waypoint);
