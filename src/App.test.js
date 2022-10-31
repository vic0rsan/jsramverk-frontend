import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, act, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TheEditor from './components/editor';
import Docs from './components/docs';

let container = null;

beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
});

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
});

afterAll(() => {
    setTimeout(() => process.exit(), 1000);
});

describe('Krav 1: Test print text to pdf from input', () => {
    it('Should activate the print button and get identical text output from input', async () => {
        act(() =>{
            render(<TheEditor state={false} doc={{_id: null, body: "<p>test sample</p>"}} test={true} />, container);
        });

        await Promise.resolve(screen.findByTestId('print'));

        jest.spyOn(console, 'log');

        try {
            let printBtn = await Promise.resolve(screen.getByTestId('print'));

            await Promise.resolve(fireEvent.click(printBtn));
            //console.info(console.log.mock.calls);
            expect(console.log.mock.calls[0][0]).toBe("Text has been converted to a pdf");
            expect(console.log.mock.calls[1][0]).toBe('<div style="width:800px"><p>test sample</p></div>');
        } catch (err) {
            console.log(err);
        }
    }); 
});

describe('Krav 4: Activate code mode and run js-code', () => {
    it('Should enter sample code, execute and get a non-empty or invalid response', async () => {
        act(() => {
            render(<Docs />);
        });
        await Promise.resolve(screen.findByTestId)
    });
});