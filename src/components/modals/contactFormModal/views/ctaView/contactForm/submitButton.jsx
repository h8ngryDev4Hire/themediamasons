'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { bangers } from '@ui/fonts.ts';
import { useContext } from 'react';
import { contactFormContext } from './contactForm';
import { ContactFormModalContext, exitModalContext } from '@components/modals/contactFormModal/contactFormModal';
import validate from './validate';
export default function SubmitButton() {
    var _this = this;
    var _a = useContext(ContactFormModalContext), modalPhase = _a.phase, modalError = _a.error;
    var phase = modalPhase[0], setPhase = modalPhase[1];
    var error = modalError[0], setError = modalError[1];
    var contactData = useContext(contactFormContext)[0];
    var exitModal = useContext(exitModalContext);
    var handleButtonClick = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var result, response, error_2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    result = validate(contactData);
                    if (result instanceof Error)
                        throw result;
                    return [4 /*yield*/, fetch('/api/post/contact-info', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(contactData)
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_2 = _a.sent();
                    throw new Error(error_2);
                case 4:
                    setPhase('thank-you');
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    setError(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<button id="submit-btn" onClick={handleButtonClick} className={"\n\t\t ".concat(bangers.className, " \n\t\t trans-ease h-[2.5rem] w-[8rem] \n\t\t rounded-xl bg-zinc-500 \n\t\t text-center hover:scale-[.90]\n\t\t")}>
			Submit
		</button>);
}
