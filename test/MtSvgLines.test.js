import React from 'react';
import MtSvgLines from '../dist/';

describe( 'MtSvgLines', function () {

  it( 'renders okay', function () {
    const subject = <MtSvgLines />;
    const renderedSubject = TestUtils.renderIntoDocument( subject );
    expect( renderedSubject ).to.not.equal( undefined );
  });

  // add more tests here..
});
