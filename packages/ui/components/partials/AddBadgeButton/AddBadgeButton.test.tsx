import { shallow, ShallowWrapper } from "enzyme"
import { getTestId, setTestid } from "utils"
import { AddBadgeButtonProps,AddBadgeButton } from "./AddBadgeButton"

describe('AddBadgeButton', () => {
    let wrapper:ShallowWrapper
    let mockOnClick:jest.Mock
    const props:AddBadgeButtonProps = {
        onClick() {
            
        },
    }

    beforeEach(()=>{
        mockOnClick = jest.fn()
        wrapper = shallow(<AddBadgeButton {...props} onClick={mockOnClick} />)
    })

    it("should render child properly",()=>{
        expect(shallow(<AddBadgeButton {...props}>
            <div {...setTestid("child")}>child</div>
        </AddBadgeButton>).find(getTestId("child")).length).toBe(1)

    })

    it("should trigger on when user clicks on the wrapper",()=>{
        wrapper.simulate("click")
        expect(mockOnClick).toBeCalledTimes(1)
    })

    it("should match snapshot",()=>{
        expect(wrapper).toMatchSnapshot()
    })
})