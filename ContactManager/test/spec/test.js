/*global describe, it */
'use strict';

(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
			var myFlag = true;
            it('should run here few assertions', function () {
				expect(myFlag).toEqual(true);
            });
        });
    });
})();
