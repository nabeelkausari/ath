import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "../../../../../../components/Tooltip/Tooltip";
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  PublishIcon,
  RepublishIcon,
  TickIcon,
  UnpublishIcon
} from "../../../../../../../common/images";
import Loader from "../../../../../../components/Loader";
import {
  deleteUdf,
  publishUdfFunction,
  unpublishUdfFunction
} from "../../redux/actions";
import { dialogs } from "../../../../../toPublish/Dialog";

export const UDFActions = ({
  fx,
  activeRenameFieldRef,
  saveUdfRename,
  toggleRename
}) => {
  const dispatch = useDispatch();
  const [activeDeleteRef, setActiveDeleteRef] = useState(null);

  const { rename_udf_loading, delete_udf_loading } = useSelector(
    state => state.solve.functions
  );

  const handleDeleteUdf = (link, name, ref) => {
    setActiveDeleteRef(ref);
    dispatch(
      dialogs.show({
        title: "Delete UDF?",
        subtitle: `Are you sure you want to delete the UDF : ${name} ?`,
        yesButton: {
          text: "Yes",
          onClick: () => {
            dispatch(deleteUdf(link, ref));
            return true;
          }
        },
        noButton: {
          text: "No"
        },
        items_centered: true
      })
    );
  };

  if (!fx.udf) return null;
  return (
    <>
      {fx._links.self.href !== activeRenameFieldRef && (
        <>
          {!fx.shared ? (
            <Tooltip placement="top" text="Publish UDF">
              <PublishIcon
                className="fx-list__publish"
                onClick={() => dispatch(publishUdfFunction(fx))}
              />
            </Tooltip>
          ) : (
            <div className="fx-list__icons-wrapper">
              <Tooltip placement="top" text="Published">
                <PublishIcon className="fx-list__published" />
              </Tooltip>
              <Tooltip placement="top" text="Re-Publish UDF">
                <RepublishIcon
                  className="fx-list__republish"
                  onClick={() => dispatch(publishUdfFunction(fx))}
                />
              </Tooltip>
              <Tooltip placement="top" text="UnPublish UDF">
                <UnpublishIcon
                  className="fx-list__unpublish"
                  onClick={() => dispatch(unpublishUdfFunction(fx))}
                />
              </Tooltip>
            </div>
          )}
        </>
      )}
      {fx._links.self.href === activeRenameFieldRef ? (
        <div className="fx-list__udf-rename-active-actions">
          {!rename_udf_loading ? (
            <Tooltip placement="top" text="Save UDF">
              <TickIcon
                className="fx-list__save"
                onClick={() =>
                  saveUdfRename(fx._links.update_udf_name, fx._links.self.href)
                }
              />
            </Tooltip>
          ) : (
            <Loader
              is_component={true}
              loading={rename_udf_loading}
              type="clip"
              size={2}
              className="fx-list__loader--1"
            />
          )}

          {
            <Tooltip placement="top" text="Close Edit Mode">
              <CloseIcon
                className="fx-list__close"
                onClick={() => toggleRename(fx)}
              />
            </Tooltip>
          }
        </div>
      ) : (
        <>
          <Tooltip placement="top" text="Rename UDF">
            <EditIcon
              className="fx-list__edit"
              onClick={() => toggleRename(fx)}
            />
          </Tooltip>

          <Tooltip placement="top" text="Delete UDF">
            <DeleteIcon
              className="fx-list__delete"
              onClick={() =>
                handleDeleteUdf(
                  fx._links.delete_udf,
                  fx.name,
                  fx._links.self.href
                )
              }
            />
          </Tooltip>

          {fx._links.self.href === activeDeleteRef && delete_udf_loading && (
            <Loader
              is_component={true}
              loading={delete_udf_loading}
              type="clip"
              size={2}
              className="fx-list__loader--1"
            />
          )}
        </>
      )}
    </>
  );
};
